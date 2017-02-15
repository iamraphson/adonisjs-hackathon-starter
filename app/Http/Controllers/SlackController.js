'use strict'

const Env = use('Env')
const WebClient = require('@slack/client').WebClient
const fs = require('fs')
const Helpers = use('Helpers')
const Validator = use('Validator')
class SlackController {

	constructor(){
		this.token = Env.get('SLACK_TOKEN')
		this.web = new WebClient(this.token)
		const file = Helpers.resourcesPath('locales/en/validation.json')
		this.messages = JSON.parse(fs.readFileSync(file, 'utf8'))
	}

	* index(request, response) {
		try {
			const slackResponse = yield this.getAllUsersInATeam()
			yield response.sendView('api.slackApi', {members: slackResponse.members})
		} catch(e){
			console.log(e);
			yield response.sendView('api.slackApi', {members: []})
		}
  }

  * sendMessage(request, response){
			const userData = request.only('message')
			const rules = {
				message: 'required'
			}

	    const validation = yield Validator.validate(userData, rules, this.messages)

		  if (validation.fails()) {
			  yield request.with({ errors: validation.messages() }).flash()
			  response.redirect('back')
			  return
		  }

		  try {
			  yield this.postMessage(userData.message);
			  yield request.with({ status: 'Your Message has been sent' }).flash()
			  response.redirect('back')
		  } catch(e){
			  console.log(e.message);
			  yield request.with({ errors: 'Error in sending message' }).flash()
			  response.redirect('back')
		  }
  }

  postMessage(message){
	  return new Promise((resolve, reject) => {
		  this.web.chat.postMessage('#general',
			  message + ' #AdonisJSHackathonStarter :wink: ',
			  (err, res) => {
				  if (err) {
					  return  reject(err);
				  } else {
				  	console.log('Message sent: ', res)
					  return resolve({status: 'Message sent: ' + res});
				  }
		  });
	  })
  }

  getAllUsersInATeam(){
		return new Promise((resolve, reject) => {
			this.web.users.list({}, (err, users) => {
				if (err) { return  reject(err); }
				return resolve({members: users.members})
			})
		})
  }
}

module.exports = SlackController
