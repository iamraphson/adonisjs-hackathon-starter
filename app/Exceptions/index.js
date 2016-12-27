/**
 * Created by Raphson on 12/20/16.
 */
const NE = use('node-exceptions')

class ApplicationException extends NE.LogicalException {}

class ValidationException extends NE.LogicalException {
  static failed (fields) {
    const instance = new this('Validation failed', 400)
    instance.fields = fields
    return instance
  }
}

module.exports = {ApplicationException, ValidationException}
