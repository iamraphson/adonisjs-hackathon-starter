'use strict'

class HomeController {
  async index ({ view }) {
    return view.render('welcome')
  }
}

module.exports = HomeController
