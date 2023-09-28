const nodemailer = require('nodemailer')
class mailService {
	constructor() {
		this.transporter = nodemailer.createTransport({
			service: 'gmail',
			host: process.env.SMTP_HOST,
			port: process.env.SMTP_PORT,
			secure: false,
			auth: {
				user: process.env.SMTP_USER,
				pass: process.env.SMTP_PASSWORD,
			},
		})
	}
	async sendActivationMail(email, link) {
		await this.transporter.sendMail({
			from: process.env.SMTP_USER,
			to: email,
			subject: 'Активация аккаунта в SALES UZ  ' + process.env.API_URL,
			text: '',
			html: `
            <div>
            <h1>Для активации перейдите по ссылке</h1>
            <a href="${link}">${link}</a>
            </div>
            `,
		})
	}
	async sendRecoverAccess(email, link) {
		await this.transporter.sendMail({
			from: process.env.SMTP_USER,
			to: email,
			subject: 'Запрос на изменение пароля в Sales.uz ',
			text: '',
			html: `
            <div>
            <h1>Для измения отправьте пароль</h1>
            <a href="${link}">${link}</a>
            </div>
            `,
		})
	}
	async sendCode(email, code) {
		await this.transporter.sendMail({
			from: process.env.SMTP_USER,
			to: email,
			subject: 'Запрос на вход в adminpage Sales.uz ',
			text: '',
			html: `
            <div>
            <h1>Для измения отправьте пароль</h1>
						<br>
						<h1><strong>${code}</strong><h1>
						<br>
            </div>
            `,
		})
	}
	async sendConfirmation(email) {
		await this.transporter.sendMail({
			from: process.env.SMTP_USER,
			to: email,
			subject: 'Пароль успешно изменён!',
			text: '',
		})
	}
}
module.exports = new mailService()
