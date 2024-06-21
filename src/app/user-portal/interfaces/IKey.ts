export interface IKey {
	id?: number,
	name?: string,
	value?: string,
	createdAt?: string,
	updatedAt?: string,
	is_active: boolean,
	user_id?: number
	formattedApiKey?: string
}