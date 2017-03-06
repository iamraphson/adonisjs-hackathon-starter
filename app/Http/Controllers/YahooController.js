/**
 * Created by Raphson on 3/6/17.
 */
const request = require('request');

class YahooController{

	constructor() {
		this.query = "select * from weather.forecast where woeid in (select woeid from geo.places(1) where text='new york,NY')";
	}

	* index(request, response){
		try {
			const yahooResponse = yield this.getDatas()
			yield response.sendView('api.yahooApi', { data: yahooResponse.query.results.channel})
			console.log(yahooResponse.query.results.channel.item.condition)
		} catch(e){
			console.log('error', e.message);
		}
	}

	getDatas(){
		return new Promise((resolve, reject) => {
			request.get('https://query.yahooapis.com/v1/public/yql?q='+ this.query +'&format=json',
				(err, request, body) => {
				if (err) { return  reject(err); }
				return resolve(JSON.parse(body))
			})
		})
	}
}

module.exports = YahooController