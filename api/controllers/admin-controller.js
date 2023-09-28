const ApiError = require('../exceptions/api-error')
const adminService = require('../services/admin-service')
class AdminController {
	async checkPassword(req, res, next) {
		try {
			const { password } = req.body
			await adminService.checkPass(password)
			return res.status(200)
		} catch (e) {
			next(e)
		}
	}
	async checkCode(req, res, next) {
		try {
			const { mailCode } = req.body
			const result = await adminService.checkCode(mailCode)
			return res.status(200).send('done')
		} catch (e) {
			next(e)
		}
	}
}

module.exports = new AdminController()
