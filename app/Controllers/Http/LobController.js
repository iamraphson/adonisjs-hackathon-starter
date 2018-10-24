'use strict'

const Env = use('Env')
const lob = require('lob')(Env.get('LOB_ID'))

class LobController {
  constructor () {
    this.zipCode = '10007'
  }

  async index ({ view }) {
    try {
      const lobResponse = await this.getRoutes(this.zipCode)
      return view.render('api.lob', { cities: lobResponse.cities })
    } catch (e) {
      console.log('error', e)
    }
  }

  getRoutes (zipCode) {
    return new Promise((resolve, reject) => {
      lob.usZipLookups.lookup({ zip_code: zipCode }, (err, res) => {
        if (err) { return reject(err) }
        return resolve({ cities: res.cities })
      })
    })
  }
}

module.exports = LobController
