'use strict'
const Env = use('Env')
const clockwork = require('clockwork')({ key: Env.get('CLOCKWORK_ID') })
const { validateAll } = use('Validator')

class ClockworkController {
  async index({ view }){
    return view.render('api.clockwork')
  }

  async postClockwork({request, response, session}) {
    const userData = request.only(['telephone'])
    const rules = {
      telephone: 'required'
    }

    const validation = await validateAll(userData, rules)

    if (validation.fails()) {
      session
        .withErrors(validation.messages())
        .flashAll()

      return response.redirect('back')
    }

    try {
      await this.sendMessage(userData.telephone)
      console.log('sent')
      session.flash({ status: 'Text sent to ' + userData.telephone })
      return response.redirect('back')
    } catch (e) {
      console.log(e)
      session.flash({ error: 'Error in sending Text' })
      return response.redirect('back')
    }

  }

  sendMessage(phoneNumber){
    const message = {
      To: phoneNumber,
      From: 'AdonisJS',
      Content: 'Hello from the AdonisJS Hackathon Starter'
    }
    return new Promise((resolve, reject) => {
      clockwork.sendSms(message, (error, resp) => {
        if (error) { return reject(error.errDesc) }
        return resolve({msg: resp.responses[0].to})
      })
    })
  }
}

module.exports = ClockworkController
