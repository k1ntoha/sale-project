import Sale from '../../types/SaleTypes'

export interface SaleResponse {
	sales: Sale[]
	sale: Sale
	saleId: string
}
