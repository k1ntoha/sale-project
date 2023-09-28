const jwt = require('jsonwebtoken')
const tokenModel = require('../models/token-model')
require('dotenv').config()
class TokenService {
	generateTokens(payload) {
		const accessToken = jwt.sign(payload, process.env.JWT_ACCESS_SECRET, {
			expiresIn: '15s',
		})
		const refreshToken = jwt.sign(payload, process.env.JWT_REFRESH_SECRET, {
			expiresIn: '30d',
		})
		return { accessToken, refreshToken }
	}
	validateAccessToken(token) {
		try {
			const userData = jwt.verify(token, process.env.JWT_ACCESS_SECRET)
			return userData
		} catch (e) {
			return null
		}
	}
	validateRefreshToken(token) {
		try {
			const userData = jwt.verify(token, process.env.JWT_REFRESH_SECRET)
			return userData
		} catch (e) {
			return null
		}
	}
	validateRecoverToken(token) {
		try {
			const recCode = jwt.verify(token, process.env.JWT_RECOVER_SECRET)
			return recCode
		} catch (e) {
			return null
		}
	}
	async saveToken(userId, rfr) {
		const tokenData = await tokenModel.findOne({ user: userId })
		if (tokenData) {
			tokenData.refreshToken = rfr
			return tokenData.save()
		}
		const token = await tokenModel.create({
			user: userId,
			refreshToken: rfr,
		})
		return token
	}
	async removeToken(refreshToken) {
		const tokenData = await tokenModel.deleteOne({ refreshToken })
		return tokenData
	}
	async findToken(tkn) {
		const data = await tokenModel.findOne({ refreshToken: tkn })
		return data
	}
	async generateRecoverToken(payload) {
		const recoverToken = await jwt.sign(
			payload,
			process.env.JWT_RECOVER_SECRET,
			{ expiresIn: '3m' }
		)
		return recoverToken
	}
}

module.exports = new TokenService()
