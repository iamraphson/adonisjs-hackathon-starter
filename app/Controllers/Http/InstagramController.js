'use strict'
const api = make('App/Services/ApiService')
const Env = use('Env')
const ig = require('instagram-node').instagram()
const async = require('async');

class InstagramController {
  constructor () {
    ig.use({
      client_id: Env.get('INSTAGRAM_CLIENT_ID'),
      client_secret: Env.get('INSTAGRAM_CLIENT_SECRET')
    })
  }

  async index ({request, response, auth, view}) {
    try {
      let user = await auth.getUser()
      const token = await api.getToken('instagram', user.id)
      if (token === null) {
        response.redirect('/auth/instagram?redirect=' + request.originalUrl())
      }

      try {
        const igResponse = await this.getData(token)
        return view.render('api.instagram', { usernames: igResponse.usernames,
          userById: igResponse.userById, myRecentMedia: igResponse.myRecentMedia })
      } catch (e) {
        console.log('error', e.message)
        return view.render('api.instagram', { usernames: [], userById: {}, myRecentMedia: {} })
      }
    } catch (e) {
      console.log(e)
      response.redirect('/login')
    }
  }

  getData (token){
    ig.use({ access_token: token.oauth_token })
    return new Promise((resolve, reject) => {
      async.parallel({
        searchByUsername: (done) => {
          ig.user_search('iamraphson', (err, users) => {
            done(err, users)
          })
        },
        searchByUserId: (done) => {
          ig.user('224366365', (err, user) => {
            done(err, user)
          })
        },
        myRecentMedia: (done) => {
          ig.user_self_media_recent((err, medias) => {
            done(err, medias)
          })
        }
      }, (err, results) => {
        if (err) { return reject(err) }
        return resolve({
          usernames: results.searchByUsername,
          userById: results.searchByUserId,
          myRecentMedia: results.myRecentMedia
        })
      })
    })
  }
}

module.exports = InstagramController
