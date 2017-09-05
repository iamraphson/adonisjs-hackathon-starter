'use strict'

const api = make('App/Services/ApiService')
const Env = use('Env')
const Linkedin = require('node-linkedin')(Env.get('LINKEDIN_ID'), Env.get('LINKEDIN_SECRET'))

class LinkedinController {
  async index ({request, response, auth, view}) {
    try {
      let user = await auth.getUser()
      const token = await api.getToken('linkedin', user.id)
      if (token === null) {
        response.redirect('/auth/linkedin?redirect=' + request.originalUrl())
      }

      try {
        const $inResponse = await this.getData(token)
        return view.render('api.linkedin', {profile: $inResponse.profile})
      } catch (e) {
        console.log('error', e.message)
        return view.render('api.linkedin', { profile: {} })
      }
    } catch (e) {
      console.log(e)
      response.redirect('/login')
    }
  }

  getData (token) {
    const linkedin = Linkedin.init(token.oauth_token)
    return new Promise((resolve, reject) => {
      linkedin.people.me((err, $in) => {
        if (err) { return reject(err) }
        return resolve({
          profile: $in
        })
      })
    })
  }
}

module.exports = LinkedinController
