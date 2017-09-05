'use strict'
const Env = use('Env')
const graph = require('fbgraph')
const api = make('App/Services/ApiService')

class FacebookController {
  async index ({request, response, auth, view}) {
    try {
      let user = await auth.getUser()
      const token = await api.getToken('facebook', user.id)
      if (token === null) {
        response.redirect('/auth/facebook?redirect=' + request.originalUrl())
      }

      try {
        const profileResponse = await this.getFacebookProfile(token)
        return view.render('api.facebook', { details: profileResponse.results })
      } catch (e) {
        console.log(e.message)
        await api.deleteToken('facebook', user.id)
        response.redirect('/auth/facebook?redirect=' + request.originalUrl())
      }
    } catch (e) {
      console.log(e)
      response.redirect('/login')
    }
  }

  getFacebookProfile(token) {
    return new Promise((resolve, reject) => {
      graph.setAccessToken(token.oauth_token)
      graph.get(`/me?fields=id,name,email,first_name,last_name,gender,link,locale,timezone`, (err, results) => {
        if (err) { return reject(err) }
        return resolve({results})
      });
    })
  }
}

module.exports = FacebookController
