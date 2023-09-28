const { Schema, model } = require('mongoose')

const AdminSchema = new Schema({
	email: { type: String, unique: true, required: false },
	password: { type: String, required: true },
	mailCode: { type: String, default: '' },
})

module.exports = model('Control', AdminSchema)
