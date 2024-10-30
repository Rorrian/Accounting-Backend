import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator'

export class AuthDto {
	@IsEmail()
	email: string

	@MinLength(6, {
		message: 'Password must be at least 6 characters long',
	})
	@IsString()
	password: string
}

export class ResetPasswordDto {
	@IsEmail()
	@IsNotEmpty()
	email: string
}

export class ChangePasswordDto {
	@IsNotEmpty()
	resetToken: string

	@MinLength(6, {
		message: 'Password must be at least 6 characters long',
	})
	@IsString()
	password: string
}
