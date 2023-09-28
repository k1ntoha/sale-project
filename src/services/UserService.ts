import { AxiosResponse } from 'axios'
import $api from '../http'
import { UserResponse } from '../models/response/UserResponse'

export default class UserService {
	static async deleteSale(currentUserAndSale: {
		userId: string
		saleId: string
	}): Promise<AxiosResponse<UserResponse>> {
		return $api.post<UserResponse>('/deleteSale', currentUserAndSale)
	}

	static async toggleSave(
		saleId: string
	): Promise<AxiosResponse<UserResponse>> {
		return $api.post<UserResponse>('/toggleSave', { saleId: saleId })
	}
}
