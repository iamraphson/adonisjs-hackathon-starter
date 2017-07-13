'use strict'

const Env = use('Env')
const Youch = use('youch')
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
	const status = error.status || 500

	/**
	 * DEVELOPMENT REPORTER
	 */
	if (Env.get('NODE_ENV') === 'development') {
		const youch = new Youch(error, request.request)
		const type = request.accepts('json', 'html')
		const formatMethod = type === 'json' ? 'toJSON' : 'toHTML'
		const formattedErrors = yield youch[formatMethod]()
		response.status(status).send(formattedErrors)
		return
	}

	/**
	 * PRODUCTION REPORTER
	 */
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

	View.global('inArray', function(arr, needle) {
			let i = arr.length;
			while (i--) {
				if (arr[i] === needle) {
					return true;
				}
			}
			return false;
	})
}
