const BaseExceptionHandler = use('BaseExceptionHandler')

class ExceptionHandler extends BaseExceptionHandler {
  async handle (error, { response }) {
    if (error.name === 'EBADCSRFTOKEN') {
      response.forbidden('Cannot process your request.')
    }
  }
}

module.exports = ExceptionHandler
