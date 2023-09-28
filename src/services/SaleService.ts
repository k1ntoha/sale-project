import { AxiosResponse } from 'axios'
import $api from '../http'
import { SaleResponse } from '../models/response/SaleResponse'
import Sale from '../types/SaleTypes'

export default class SaleService {
	static async fetchSales(): Promise<AxiosResponse<SaleResponse>> {
		return $api.get<SaleResponse>('/fetchSales')
	}

	static async addSale(sale: Sale): Promise<AxiosResponse<SaleResponse>> {
		return $api.post<SaleResponse>('/addSale', sale)
	}

	static async deleteSale(
		saleId: string
	): Promise<AxiosResponse<SaleResponse>> {
		return $api.post<SaleResponse>('/deleteSale', { saleId: saleId })
	}

	static async updateSale(sale: Sale): Promise<AxiosResponse<SaleResponse>> {
		return $api.post<SaleResponse>('/updateSale', sale)
	}

	static async acceptSale(
		saleId: string
	): Promise<AxiosResponse<SaleResponse>> {
		return $api.post<SaleResponse>('/saleApprove', { saleId: saleId })
	}

	static async declineSale(
		saleId: string
	): Promise<AxiosResponse<SaleResponse>> {
		return $api.post<SaleResponse>('/saleDecline', { saleId: saleId })
	}
}
