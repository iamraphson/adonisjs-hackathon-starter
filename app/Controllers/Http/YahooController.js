'use strict'

const request = require('request')

class YahooController {
  constructor () {
    this.query = "select * from weather.forecast where woeid in (select woeid from geo.places(1) where text='new york,NY')"
  }

  async index ({ view }) {
    try {
      const yahooResponse = await this.getDatas()
      return view.render('api.yahoo', { data: yahooResponse.query.results.channel })
    } catch (e) {
      console.log('error', e.message)
    }
  }

  getDatas(){
    return new Promise((resolve, reject) => {
      request.get('https://query.yahooapis.com/v1/public/yql?q=' + this.query + '&format=json',
        (err, request, body) => {
          if (err) { return reject(err) }
          return resolve(JSON.parse(body))
        })
    })
  }
}

module.exports = YahooController
