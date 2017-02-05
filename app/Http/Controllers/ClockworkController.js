/**
 * Created by Raphson on 2/5/17.
 */
const Env = use('Env')
const clockwork = require('clockwork')({ key: Env.get('CLOCKWORK_ID') });
const fs = require('fs')
const Helpers = use('Helpers')
const Validator = use('Validator')

class ClockworkController{

	constructor () {
		const file = Helpers.resourcesPath('locales/en/validation.json')
		this.messages = JSON.parse(fs.readFileSync(file, 'utf8'))
	}

	* index(request, response){
		yield response.sendView('api.clockworkApi')
	}

	* postClockwork(request, response) {
		const userData = request.only('telephone')
		const rules = {
			telephone: 'required'
		}

		const validation = yield Validator.validate(userData, rules, this.messages)

		if (validation.fails()) {
			yield request.with({ errors: validation.messages() }).flash()
			response.redirect('back')
			return
		}

		try {
			yield this.sendMessage(userData.telephone);
			console.log('sent')
			yield request.with({ status: 'Text sent to ' + userData.telephone }).flash()
			response.redirect('back')
		} catch(e){
			console.log(e);
			yield request.with({ error: 'Error in sending Text' }).flash()
			response.redirect('back')
		}

	}

	sendMessage(phoneNumber){
		const message = {
			To: phoneNumber,
			From: 'AdonisJS',
			Content: 'Hello from the AdonisJS Hackathon Starter'
		};
		return new Promise((resolve, reject) => {
			clockwork.sendSms(message, (error, resp) => {
				if (error) { return reject(error.errDesc); }
				return resolve({msg: resp.responses[0].to})
			})
		})
	}

}

module.exports = ClockworkController