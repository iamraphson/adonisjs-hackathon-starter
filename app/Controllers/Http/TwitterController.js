'use strict'

const api = make('App/Services/ApiService')
const Twit = require('twit')
const Env = use('Env')
const { validateAll } = use('Validator')

class TwitterController {
  async index ({ request, response, view, auth }) {
    try {
      let user = await auth.getUser()
      const token = await api.getToken('twitter', user.id)
      if (token === null) {
        response.redirect('/auth/twitter?redirect=' + request.originalUrl())
      }

      try {
        const profileResponse = await this.getTwitterProfile(token)
        let tweets = profileResponse.reply.statuses
        return view.render('api.twitter', { tweets })
      } catch (e) {
        console.log(e.message)
        return view.render('api.twitter', { tweets: [] })
      }
    } catch (e) {
      console.log(e)
      response.redirect('/login')
    }
  }

  async sendTweet ({ request, response, session, auth }) {
    const tweetData = request.only(['tweet'])
    const rules = {
      tweet: 'required'
    }

    const validation = await validateAll(tweetData, rules)

    if (validation.fails()) {
      session
        .withErrors(validation.messages())
        .flashAll()

      return response.redirect('back')
    }

    try {
      let user = await auth.getUser()
      const token = await api.getToken('twitter', user.id)

      try {
        await this.postTweet(token, tweetData.tweet)
        session.flash({ status: 'Your Tweet has been sent' })
        response.redirect('back')
      } catch (e) {
        console.log(e.message)
        session.flash({ error: 'Error in sending tweets' }).flash()
        response.redirect('back')
      }
    } catch (e) {
      console.log(e)
      response.redirect('/login')
    }
  }

  postTweet (token, tweet) {
    return new Promise((resolve, reject) => {
      const T = this.configTwit(token)

      T.post('statuses/update', { status: tweet }, (err) => {
        if (err) { return reject(err) }
        return resolve({ status: 'Tweet sent' })
      })
    })
  }

  getTwitterProfile (token) {
    return new Promise((resolve, reject) => {
      const T = this.configTwit(token)

      T.get('search/tweets', { q: 'Adonisframework since:2011-07-11', count: 15 }, (err, reply) => {
        if (err) { return reject(err) }
        return resolve({reply})
      })
    })
  }

  configTwit (token) {
    return new Twit({
      consumer_key: Env.get('TWITTER_CLIENT_ID'),
      consumer_secret: Env.get('TWITTER_CLIENT_SECRET'),
      access_token: token.oauth_token,
      access_token_secret: token.oauth_token_secret
    })
  }
}

module.exports = TwitterController
