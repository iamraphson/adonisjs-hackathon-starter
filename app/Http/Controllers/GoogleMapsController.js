'use strict'
/**
 * Created by Raphson on 3/6/17.
 */

class  GoogleMapsController {
	* index(request, response){
		yield response.sendView('api.google-mapsApi')
	}
}

module.exports = GoogleMapsController