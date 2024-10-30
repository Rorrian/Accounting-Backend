import * as React from 'react'

interface IResetPasswordEmail {
	url: string
}

export default function ResetPasswordEmail({
	url
}: IResetPasswordEmail) {
	return (
		<div>

			<h1>Password reset request</h1>

			<p>Hello!</p>

			<p>You have received this email because you have requested a password reset for your account. To create a new password, please follow the link below: </p>

			<a href={url}>Reset password</a>

			<p>If the link does not work, copy and paste this URL into your browser's address bar:</p>

			<a
				href={url}
				target="_blank"
				style={{
					color: '#A981DC'
				}}
			>
				{url}
			</a>

			<p>The link will be valid for one hour.</p>

			<p>If you did not request a password reset from BudgetBuddy Account, you can safely ignore this email.</p>

			<p>Sincerely,<br/>BudgetBuddy App Support Team</p>
			<a
				href="https://www.budgetbuddy.com"
				target="_blank"
				style={{
					color: '#A981DC'
				}}
			>
				https://www.budgetbuddy.com
			</a>
		</div>
	)
}
