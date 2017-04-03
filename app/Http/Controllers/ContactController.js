'use strict'
const Validator = use('Validator')
const fs = require('fs')
const Helpers = use('Helpers')
const Mail = use('Mail')
class ContactController {

	constructor () {
		const file = Helpers.resourcesPath('locales/en/validation.json')
		this.messages = JSON.parse(fs.readFileSync(file, 'utf8'))
	}

	* index(request, response){
		yield response.sendView('contact.index')
	}

	* sendMessage(request, response){
		const rules = {
			name: 'required|min:3',
			email: 'required|email|max:255',
			message: 'required'
		}

		//validate form input
		const validation = yield Validator.validateAll(request.all(), rules, this.messages)

		if (validation.fails()) {
			yield request.withOnly('name', 'email', 'message')
				.andWith({ errors: validation.messages() }).flash()
			response.redirect('back')
			return
		}
		const email = request.input('email')
		const name = request.input('name')
		const body = request.input('message')

		yield Mail.send('mail.contacttemplate', {body: body}, (message) => {
			message.to('nsegun5@gmail.com')
			message.from('noreply@hackathonstarter.com', name)
			message.subject("Message From AdonisJS Hackathon Starter Contact Form - " + email)
		})

		yield request.with({ status: 'Your Message has been sent successfully' }).flash()
		response.redirect('back')
	}

}

module.exports = ContactController
