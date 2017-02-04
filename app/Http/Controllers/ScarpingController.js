/**
 * Created by Raphson on 2/4/17.
 */
'use strict'
const request = require('request');
const cheerio = require('cheerio')
class ScarpingController {
	constructor () {
		this.url = "https://news.ycombinator.com/"
	}

	* index (request, response) {
		try {
			const scrapingResponse = yield this.getLinks();
			yield response.sendView('api.scrapingApi', { links: scrapingResponse.links, index : 0})
		} catch(e){
			console.log('error', e.message);
			yield response.sendView('api.scrapingApi', { links: [], index : 0})
		}
	}

	getLinks() {
		return new Promise((resolve, reject) => {
			request.get('https://news.ycombinator.com/', (err, request, body) => {
				if (err) { return  reject(err); }
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
