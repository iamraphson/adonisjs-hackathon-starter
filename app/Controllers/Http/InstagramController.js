'use strict'
const api = make('App/Services/ApiService')
const Env = use('Env')
const Instagram = require('node-instagram').default
const async = require('async')

class InstagramController {
  async index ({request, response, auth, view}) {
    try {
      let user = await auth.getUser()
      const token = await api.getToken('instagram', user.id)
      if (token === null) {
        response.redirect('/auth/instagram?redirect=' + request.originalUrl())
      }

      try {
        const igResponse = await this.getData(token)
        return view.render('api.instagram', {
          username: igResponse.username,
          myRecentMedia: igResponse.myRecentMedia
        })
      } catch (e) {
        console.log('error', e.message)
        return view.render('api.instagram', { usernames: {}, myRecentMedia: []})
      }
    } catch (e) {
      console.log(e)
      response.redirect('/login')
    }
  }

  getData (token) {
    const instagram = new Instagram({
      clientId: Env.get('INSTAGRAM_CLIENT_ID'),
      clientSecret: Env.get('INSTAGRAM_CLIENT_SECRET'),
      accessToken: token.oauth_token
    })
    return new Promise((resolve, reject) => {
      async.parallel({
        getUsername: (done) => {
          instagram.get(`users/self`, (err, { data}) => {
            console.log(data)
            done(err, data)
          })
        },
        myRecentMedia: (done) => {
          instagram.get('users/self/media/recent').then(({ data }) => {
            done(null , data)
          }).catch(err => {
            done(err)
          })
        }
      }, (err, results) => {
        if (err) { return reject(err) }
        return resolve({
          username: results.getUsername,
          myRecentMedia: results.myRecentMedia
        })
      })
    })
  }
}

module.exports = InstagramController
