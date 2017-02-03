/**
 * Created by Raphson on 2/3/17.
 */

const tumblr = require('tumblr.js');
const Env = use('Env')
class TumblrController {
	constructor () {
		this.blogAddress = 'jasonnjoku.tumblr.com';
		this.client = tumblr.createClient({
			consumer_key: Env.get('TUMBLR_ID'),
			consumer_secret: Env.get('TUMBLR_SECRET'),
			token: null,
			token_secret: null
		});
	}

	* index (request, response) {
		try {
			const tumblrResponse = yield this.getBlogPosts();
			yield response.sendView('api.tumblrApi', { info: tumblrResponse.data})
		} catch(e){
			console.log('error', e.message);
		}
  }

	getBlogPosts(){
		return new Promise((resolve, reject) => {
			this.client.blogPosts(this.blogAddress, {}, (err, data) => {
				if (err) {
					return reject(err);
				}
				console.log(data.posts)
				return resolve({data: data})
			})
		});
	}
}
module.exports = TumblrController