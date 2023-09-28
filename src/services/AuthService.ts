import { AxiosResponse } from 'axios'
import $api from '../http'
import { AuthResponse } from '../models/response/AuthResponse'

export default class AuthService {
	static async login(
		email: string,
		password: string
	): Promise<AxiosResponse<AuthResponse>> {
		return $api.post<AuthResponse>('/login', { email, password })
	}

	static async registration(
		email: string,
		password: string
	): Promise<AxiosResponse<AuthResponse>> {
		return $api.post<AuthResponse>('/registration', { email, password })
	}

	static async sendRecoverMail(email: string): Promise<AxiosResponse> {
		return $api.post<AuthResponse>('/sendRecoverMail', { email: email })
	}

	static async sendRecoverCode(
		recoverCode: number,
		email: string
	): Promise<AxiosResponse<AuthResponse>> {
		return await $api.post<AuthResponse>('/sendRecoverCode', {
			recoverCode: recoverCode,
			email: email,
		})
	}

	static async logout(): Promise<void> {
		return $api.post('/logout')
	}
}
