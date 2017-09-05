'use strict'

const Env = use('Env')
const lob = require('lob')(Env.get('LOB_ID'));

class LobController {
  constructor () {
    this.zipCode = ['10007']
  }

  async index ({ view }) {
    try {
      const lobResponse = await this.getRoutes(this.zipCode)
      return view.render('api.lob', {routes: lobResponse.routes})
    } catch (e) {
      console.log('error', e)
    }
  }

  getRoutes (zipCode) {
    return new Promise((resolve, reject) => {
      lob.routes.list({ zip_codes:  zipCode }, (err, routes) => {
        if (err) { return reject(err) }
        return resolve({routes: routes.data[0].routes})
      });
    })
  }
}

module.exports = LobController
