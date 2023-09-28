module.exports = class UserDto {
	id
	email
	isActivated
	savedSales
	createdSales
	constructor(model) {
		this.email = model.email
		this.id = model._id
		this.isActivated = model.isActivated
		this.savedSales = model.savedSales
		this.createdSales = model.createdSales
	}
}
