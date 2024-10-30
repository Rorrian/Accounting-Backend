import { MailerService } from '@nestjs-modules/mailer'
import { Injectable } from '@nestjs/common'
import { render } from '@react-email/render'

import VerificationEmail from '@email/confirmation.email'
import ResetPasswordEmail from '@email/resetPassword.email'

@Injectable()
export class EmailService {
	constructor(private readonly mailerService: MailerService) {}

	sendEmail(to: string, subject: string, html: string) {
		return this.mailerService.sendMail({
			to,
			subject,
			html
		})
	}

	sendVerification(to: string, verificationLink: string) {
		const html = render(VerificationEmail({ url: verificationLink }))
		return this.sendEmail(to, 'Подтверждение почты', html)
	}

	sendResetPasswordMail(to: string, verificationLink: string) {
		const html = render(ResetPasswordEmail({ url: verificationLink }))
		return this.sendEmail(to, 'Сброс пароля', html)
	}
}
