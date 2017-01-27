/**
 * Created by Raphson on 1/27/17.
 */
const ApiRepository = make('App/Repositories/ApiRepository')
const Env = use('Env')
const request = require('request');

class NewYorkTimesController {

    constructor () {
        this.query = {
            'list-name': 'young-adult',
            'api-key': Env.get('NEWYORKTIMES_BOOK_ID')
        }
    }

    * index (request, response) {
        try {
            const nytResponse = yield this.getData()
            yield response.sendView('api.nytApi', { books: nytResponse.books })
        } catch(e){
            console.log(e.message);
            yield response.sendView('api.nytApi', { books: [] })
        }
    }

    getData() {
        return new Promise((resolve, reject) => {
            request.get({ url: 'http://api.nytimes.com/svc/books/v2/lists', qs: this.query },
                (err, request, body) => {
                    if (err) { return reject(err); }

                    if (request.statusCode === 403) {
                        return reject(new Error('Invalid New York Times API Key'));
                    }

                    return resolve({
                        books: JSON.parse(body).results
                    })
            });
        })
    }
}

module.exports = NewYorkTimesController