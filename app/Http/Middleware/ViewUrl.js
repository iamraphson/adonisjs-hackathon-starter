'use strict'

class ViewUrl {

  * handle (request, response, next) {
    let baseUrl = request.secure() ? 'https://' : 'http://'
    baseUrl += request.headers().host + '/'

	  response.viewInstance = use('View')

	  response.viewInstance.global('url', (path) => {
      if (typeof path !== 'undefined') {
        path = (path.substring(0, 1) == '/') ? path.substring(1) : path
        return baseUrl + path
      }
      return baseUrl
    })

    yield next
  }

}

module.exports = ViewUrl
