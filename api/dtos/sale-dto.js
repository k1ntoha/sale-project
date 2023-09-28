module.exports = class SaleDto {
	id
	categories
	status
	percent
	company
	description
	link
	deadlineDate
	constructor(model) {
		this.id = model.id
		this.categories = model.categories
		this.status = model.status
		this.percent = model.percent
		this.company = model.company
		this.description = model.description
		this.link = model.link
		this.deadlineDate = model.deadlineDate
	}
}
