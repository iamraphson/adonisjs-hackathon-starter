/**
 * Created by Raphson on 2/5/17.
 */
const Env = use('Env')
const lob = require('lob')(Env.get('LOB_ID'));

class LobController{

	constructor(){
		this.zipCode = ['10007']
	}
	* index(request, response){
		try {
			const lobResponse = yield this.getRoutes(this.zipCode);
		} catch(e){
			console.log('error', e);
		}
	}

	getRoutes(zipCode){
		return new Promise((resolve, reject) => {
			lob.routes.list({ zip_codes:  zipCode}, (err, routes) => {
				if (err) { return reject(err); }
				return resolve({routes: routes.data[0].routes})
			});
		})
	}
}

module.exports = LobController