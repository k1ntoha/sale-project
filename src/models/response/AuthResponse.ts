import AuthUser from '../../types/UserTypes'

export interface AuthResponse {
	accessToken: string
	refreshToken: string
	user: AuthUser
}
