'use strict'

const tumblr = require('tumblr.js')
const Env = use('Env')

class TumblrController {
  constructor () {
    this.blogAddress = 'jasonnjoku.tumblr.com'
    this.client = tumblr.createClient({
      consumer_key: Env.get('TUMBLR_ID'),
      consumer_secret: Env.get('TUMBLR_SECRET'),
      token: null,
      token_secret: null
    })
  }

  async index ({view}) {
    try {
      const tumblrResponse = await this.getBlogPosts()
      return view.render('api.tumblr', { info: tumblrResponse.data })
    } catch (e) {
      console.log('error', e.message)
      return view.render('api.tumblr', { info: {} })
    }
  }

  getBlogPosts () {
    return new Promise((resolve, reject) => {
      this.client.blogPosts(this.blogAddress, {}, (err, data) => {
        if (err) {
          return reject(err)
        }
        return resolve({data: data})
      })
    })
  }
}

module.exports = TumblrController
