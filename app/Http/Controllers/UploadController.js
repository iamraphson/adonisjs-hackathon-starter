'use strict'

const Helpers = use('Helpers')
const HelperRepository = make('App/Helpers')
const mkdirp = require('mkdirp');

class UploadController {

	constructor () {
		 this.directory = Helpers.storagePath()
	}

	* index(request, response) {
		yield response.sendView('api.upload')
	}

	* upload(request, response) {
		const imageFile = request.file('myFile')
		const fileName =  HelperRepository._generateUUID() + '_test'

		if (!imageFile.exists) {
			yield request.with({ errors: 'image file not exists' }).flash()
			return response.redirect('back')
		}

		const newFileName = `${fileName}.${imageFile.extension()}`;

		mkdirp.sync(this.directory + "/uploads");

		yield imageFile.move(this.directory + "/uploads", newFileName);

		if (!imageFile.moved()) {
			yield request.with({ errors: imageFile.errors() }).flash()
			return response.redirect('back')
		}

		yield request.with({ status: 'Uploaded to this path: ' +  imageFile.uploadPath()}).flash()
		response.redirect('back')
	}
}

module.exports = UploadController
