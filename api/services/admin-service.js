const ApiError = require('../exceptions/api-error')
const adminModel = require('../models/admin-model')
const tokenService = require('../services/token-service')
const mailService = require('../services/mail-service')
const bcrypt = require('bcrypt')
const uuid = require('uuid')
class AdminService {
	async checkPass(pass) {
		if (!pass) {
			throw ApiError.BadRequest('empty fields')
		}
		const users = await adminModel.find({})
		const user = users[0]
		const check = await bcrypt.compare(pass, user.password)
		if (!check) {
			throw ApiError.BadRequest('incorrect password')
		}
		const code = uuid.v4()
		const hashCode = await bcrypt.hash(String(code), 3)
		const token = await tokenService.generateRecoverToken({
			mailCode: hashCode,
		})
		await mailService.sendCode(
			user.email,
			`Ваш код для восстановления пароля : ${code} 
       
			Срок действия кода 3 минуты
      
      Если вы не хотели изменять пароль , то проигнорируйте данное письмо `
		)
		await user.updateOne({ mailCode: token })
		return token
	}
	async checkCode(code) {
		if (!code) {
			throw ApiError.BadRequest('empty fileds')
		}
		const users = await adminModel.find({})
		const user = users[0]
		const tokenData = await tokenService.validateRecoverToken(user.mailCode)
		if (!tokenData) {
			throw ApiError.BadRequest()
		}
		const result = await bcrypt.compare(code, tokenData.mailCode)
		if (!result) {
			throw ApiError.BadRequest('incorrect code')
		}
		return true
	}
}
module.exports = new AdminService()
