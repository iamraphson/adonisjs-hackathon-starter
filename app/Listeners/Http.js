'use strict'

const Env = use('Env')
const Ouch = use('youch')
const moment = require('moment');
const Http = exports = module.exports = {}

/**
 * handle errors occured during a Http request.
 *
 * @param  {Object} error
 * @param  {Object} request
 * @param  {Object} response
 */
Http.handleError = function * (error, request, response) {
  /**
   * DEVELOPMENT REPORTER
   */
  if (Env.get('NODE_ENV') === 'development') {
    const ouch = new Ouch().pushHandler(
      new Ouch.handlers.PrettyPageHandler('blue', null, 'sublime')
    )
    ouch.handleException(error, request.request, response.response, (output) => {
      console.error(error.stack)
    })
    return
  }

  /**
   * PRODUCTION REPORTER
   */
  const status = error.status || 500
  console.error(error.stack)
  yield response.status(status).sendView('errors/index', {error})
}

/**
 * listener for Http.start event, emitted after
 * starting http server.
 */
Http.onStart = function () {
  const View = use('View')
  View.global('findBy', function (hash, key) {
    const filteredValue = hash.filter((item) => item.field === key)
    return (filteredValue && filteredValue.length) ? filteredValue[0] : null
  })

	View.global('currentYear', function () {
		return moment().format('YYYY')
	})

  //Database.on('query', console.log)
  //Database.on('sql', console.log)
}
