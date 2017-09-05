'use strict'


const Env = use('Env')
const WebClient = require('@slack/client').WebClient
const { validateAll } = use('Validator')

class SlackController {
  constructor () {
    this.token = Env.get('SLACK_TOKEN')
    this.web = new WebClient(this.token)
  }

  async index ({ view }) {
    try {
      const slackResponse = await this.getAllUsersInATeam()
      return view.render('api.slack', {members: slackResponse.members})
    } catch (e) {
      console.log(e)
      return view.render('api.slack', {members: []})
    }
  }

  async sendMessage({request, response, session}){
    const userData = request.only(['message'])
    const rules = {
      message: 'required'
    }

    const validation = await validateAll(userData, rules)

    if (validation.fails()) {
      session
        .withErrors(validation.messages())
        .flashAll()

      return response.redirect('back')
    }

    try {
      await this.postMessage(userData.message)
      session.flash({ status: 'Your Message has been sent' })
      response.redirect('back')
    } catch (e) {
      console.log(e.message)
      session.flash({ errors: 'Error in sending message' })
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
