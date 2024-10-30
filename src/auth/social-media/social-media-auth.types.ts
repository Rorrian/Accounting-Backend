export interface IGoogleProfile {
	accessToken: string
	email: string
	firstName: string
	lastName: string
	picture: string
}

export interface IGithubProfile {
	accessToken: string
	email: string
	picture: string
	username: string
}

export type TSocialProfile = IGoogleProfile | IGithubProfile
