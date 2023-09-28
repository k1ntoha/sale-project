const ApiError = require('../exceptions/api-error')
const saleModel = require('../models/sale-model')
const tokenService = require('../services/token-service')
const SaleDto = require('../dtos/sale-dto')
const userService = require('./user-service')
class SaleService {
	async addSale(refreshToken, s) {
		if (!refreshToken) {
			throw ApiError.UnauthorizedError()
		}
		const validation = tokenService.validateRefreshToken(refreshToken)
		if (!validation) {
			throw ApiError.BadRequest('Invalid token!')
		}
		if (!s) {
			throw ApiError.BadRequest('пустые поля')
		}
		const tokenOwner = await tokenService.findToken(refreshToken)
		if (!tokenOwner) {
			throw ApiError.UnauthorizedError()
		}

		const saleInfo = new SaleDto(s)
		const sale = await saleModel.create({ ...saleInfo })
		const userData = await userService.addToProfile(tokenOwner.user, sale._id)
		if (!userData) {
			throw ApiError.BadRequest()
		}
		return sale
	}

	async getSale(token) {
		if (!token) {
			throw ApiError.UnauthorizedError()
		}
		const validation = tokenService.validateRefreshToken(token) // verifieng user by his token (refresh)
		if (!validation) {
			throw ApiError.BadRequest('Invalid token')
		}
		const userId = validation.id // got id of the user who is asking
		const usersSales = await saleModel.find({ creater: userId })
		return usersSales
	}

	async getAllSales() {
		const sales = await saleModel.find({})
		return { sales: sales }
	}

	async saleUpdate(info) {
		if (!info) {
			throw ApiError.BadRequest('Pustiye pola')
		}
		const saleInfo = new SaleDto(info)
		saleInfo.status = 'moderating'
		const saleUpdated = await saleModel.updateOne(
			{ id: info.id },
			{ ...saleInfo }
		)
		return saleUpdated
	}

	async saleDelete(token, id) {
		// for user
		if (!id) {
			throw ApiError.BadRequest('пустые поля')
		}
		const sale = await saleModel.deleteOne({ _id: id })
		const tokenInfo = await tokenService.findToken(token)
		const deletefromUser = await userService.removeFromProfile(
			tokenInfo.user,
			id
		)
		return sale
	}

	async saveSale(token, saleId) {
		if (!token || !saleId) {
			throw ApiError.BadReques('пустые поля')
		}
		const tokenInfo = await tokenService.findToken(token)
		const saveToProfile = await userService.saveToProfile(
			tokenInfo.user,
			saleId
		)
		return saveToProfile
	}

	async saleApprove(id) {
		if (!id) {
			throw ApiError.BadRequest('пустые поля')
		}
		const sale = await saleModel.findOne({ _id: id })
		if (!sale) {
			throw ApiError.BadRequest('sale не найден')
		}
		await sale.updateOne({ status: 'accepted' })
		return sale
	}

	async saleDecline(id) {
		if (!id) {
			throw ApiError.BadRequest('пустые поля')
		}
		const sale = await saleModel.findOne({ _id: id })
		if (!sale) {
			throw ApiError.BadRequest('sale не найден')
		}
		await sale.updateOne({ status: 'declined' })
		return sale
	}
}

module.exports = new SaleService()
