class ExceptionHandler {
  async handle (error, { response }) {
    if (error.code === 'EBADCSRFTOKEN') {
      response.forbidden('Cannot process your request.')
      return
    }
  }
}
