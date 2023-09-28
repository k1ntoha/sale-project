export interface UserResponse {
	currentUserAndSale: CurrentUserAndSale
	currentUserAndNewSale: CurrentUserAndNewSale
	saleId: string
}

interface CurrentUserAndSale {
	saleId: string
	userId: string
}

interface CurrentUserAndNewSale {
	userId: string
	saleId: string
}
