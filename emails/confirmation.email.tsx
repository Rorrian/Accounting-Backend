import * as React from 'react'

interface IVerificationEmail {
	url: string
}

export default function VerificationEmail({
	url
}: IVerificationEmail) {
	return (
		<div>
			<h1>Account verification</h1>

			<p>Hello!</p>

			<p>You are almost done registering! Please confirm your email by clicking the link below:</p>

			<a href={url}>Confirm Email</a>

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

			<p>If you did not request BudgetBuddy account verification, simply ignore this email.</p>

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
