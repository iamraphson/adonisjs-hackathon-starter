'use strict'

class GoogleMapController {
  async index ({ view }) {
    return view.render('api.google-map')
  }
}

module.exports = GoogleMapController
