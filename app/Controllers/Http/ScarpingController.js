'use strict'

const request = require('request')
const cheerio = require('cheerio')

class ScarpingController {
  constructor () {
    this.url = 'https://news.ycombinator.com/'
  }

  async index ({ view }) {
    try {
      const scrapingResponse = await this.getLinks()
      return view.render('api.scraping', { links: scrapingResponse.links })
    } catch (e) {
      console.log('error', e.message)
      return view.render('api.scraping', { links: [] })
    }
  }

  getLinks() {
    return new Promise((resolve, reject) => {
      request.get('https://news.ycombinator.com/', (err, request, body) => {
        if (err) { return reject(err) }
        const $ = cheerio.load(body)
        const links = []
        $('.title a[href^="http"], a[href^="https"]').each((index, element) => {
          links.push($(element))
        })
        return resolve({links})
      })
    })
  }
}

module.exports = ScarpingController
