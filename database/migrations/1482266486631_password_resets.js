'use strict'

const Schema = use('Schema')

class PasswordResetsTableSchema extends Schema {

      up () {
            this.create('password_resets', (table) => {
                table.string('email').Nullable();
                table.string('token').Nullable();
                table.index('email');
                table.index('token');
                table.timestamp('created_at');
            })
      }

  down () {
    this.drop('password_resets')
  }

}

module.exports = PasswordResetsTableSchema
