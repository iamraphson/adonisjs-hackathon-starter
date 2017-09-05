'use strict'

const Env = use('Env')
const request = require('request')

class NewYorkTimeController {
  constructor () {
    this.query = {
      'list-name': 'young-adult',
      'api-key': Env.get('NEWYORKTIMES_BOOK_ID')
    }
  }

  async index ({ view }) {
    try {
      const nytResponse = await this.getData()
      return view.render('api.nyt', { books: nytResponse.books })
    } catch (e) {
      console.log(e.message)
      return view.render('api.nyt', { books: [] })
    }
  }

  getData () {
    return new Promise((resolve, reject) => {
      request.get({ url: 'http://api.nytimes.com/svc/books/v2/lists', qs: this.query },
        (err, request, body) => {
          if (err) { return reject(err) }

          if (request.statusCode === 403) {
            return reject(new Error('Invalid New York Times API Key'))
          }

          return resolve({
            books: JSON.parse(body).results
          })
        });
    })
  }
}

module.exports = NewYorkTimeController
