class ExceptionHandler {

  async handle (error, { response, session }) {
    if (error.code === 'EBADCSRFTOKEN') {
      response.forbidden('Cannot process your request.')
      return
    }
  }
}

module.exports = ExceptionHandler
