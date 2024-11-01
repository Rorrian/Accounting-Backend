import {
	BadRequestException,
	Injectable,
	NotFoundException,
	UnauthorizedException
} from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { Role, type User } from '@prisma/client'
import { hash, verify } from 'argon2'
import { omit } from 'lodash'

import { EmailService } from '@/email/email.service'
import { UserService } from '@/user/user.service'
import { PrismaService } from '@/prisma.service'

import { AuthDto, ResetPasswordDto } from './dto/auth.dto'

@Injectable()
export class AuthService {
	constructor(
		private jwt: JwtService,
		private userService: UserService,
		private emailService: EmailService,
		private prisma: PrismaService
	) {}

	private readonly TOKEN_EXPIRATION_ACCESS = '1h'
	private readonly TOKEN_EXPIRATION_REFRESH = '7d'
	private readonly TOKEN_EXPIRATION_RESET_PASSWORD = '1h';

	async login(dto: AuthDto) {
		const user = await this.validateUser(dto)

		return this.buildResponseObject(user)
	}

	async register(dto: AuthDto) {
		const userExists = await this.userService.getByEmail(dto.email)
		if (userExists) {
			throw new BadRequestException('User already exists')
		}
		const user = await this.userService.create(dto)

		await this.emailService.sendVerification(
			user.email,
			`http://localhost:4200/verify-email?token=${user.verificationToken}`
		)

		return this.buildResponseObject(user)
	}

	async getNewTokens(refreshToken: string) {
		const result = await this.jwt.verifyAsync(refreshToken)
		if (!result) {
			throw new UnauthorizedException('Invalid refresh token')
		}
		const user = await this.userService.getById(result.id)

		return this.buildResponseObject(user)
	}

	async verifyEmail(token: string) {
		const user = await this.prisma.user.findFirst({
			where: {
				verificationToken: token
			}
		})

		if (!user) throw new NotFoundException('Token not exists!')

		await this.userService.update(user.id, {
			verificationToken: null
		})

		return 'Email verified!'
	}

	async sendResetPasswordEmail(dto: ResetPasswordDto) {
		const user = await this.userService.getByEmail(dto.email)
		if (!user) {
			throw new NotFoundException('User with this email does not exist')
		}

		const resetToken = this.jwt.sign(
			{ id: user.id },
			{ expiresIn: this.TOKEN_EXPIRATION_RESET_PASSWORD }
		)

		await this.emailService.sendResetPasswordMail(
			user.email,
			`http://localhost:3000/change-password/${resetToken}`
		)
	}

	async validateResetPasswordToken(token: string): Promise<User> {
		try {
			const payload = await this.jwt.verifyAsync(token)

			const user = await this.userService.getById(payload.id)
			if (!user) {
				throw new NotFoundException('User not found')
			}

			return user
		} catch (error) {
			throw new UnauthorizedException('Invalid or expired token')
		}
	}

	async updatePassword(userId: string, password: string) {
		const hashedPassword = await hash(password);

		await this.userService.update(userId, {
			password: hashedPassword
		})
	}

	async buildResponseObject(user: User) {
		const tokens = await this.issueTokens(user.id, user.rights)

		return { user: this.omitPassword(user), ...tokens }
	}

	private async issueTokens(userId: string, rights: Role[]) {
		const payload = { id: userId, rights }
		const accessToken = this.jwt.sign(payload, {
			expiresIn: this.TOKEN_EXPIRATION_ACCESS
		})
		const refreshToken = this.jwt.sign(payload, {
			expiresIn: this.TOKEN_EXPIRATION_REFRESH
		})

		return { accessToken, refreshToken }
	}

	private async validateUser(dto: AuthDto) {
		const user = await this.userService.getByEmail(dto.email)
		if (!user) {
			throw new UnauthorizedException('Email or password invalid')
		}
		const isValid = await verify(user.password, dto.password)
		if (!isValid) {
			throw new UnauthorizedException('Email or password invalid')
		}
		
		return user
	}

	private omitPassword(user: User) {
		return omit(user, ['password'])
	}
}
