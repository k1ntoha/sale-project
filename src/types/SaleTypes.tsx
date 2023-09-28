type Sale = {
	_id: string
	categories: string[]
	percent: number
	company: string
	description: string
	link: string
	deadlineDate: string
	status: 'moderating' | 'declines' | 'accepted'
}

export default Sale
