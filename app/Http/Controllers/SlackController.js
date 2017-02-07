'use strict'

const Env = use('Env')
const WebClient = require('@slack/client').WebClient;
class SlackController {

	constructor(){
		this.token = Env.get('SLACK_TOKEN')
		this.web = new WebClient(this.token)
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

  getAllUsersInATeam(){
		return new Promise((resolve, reject) => {
			this.web.users.list({}, (err, users) => {
				if (err) { return  reject(err); }
				console.log(users)
				return resolve({members: users.members})
			})
		})
  }
}

module.exports = SlackController
