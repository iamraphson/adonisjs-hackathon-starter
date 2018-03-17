'use strict'

const Schema = use('Schema')

class ChangeAllTokenToTextInUserProfileSchema extends Schema {
  up () {
    this.alter('users_profile', (table) => {
      table.text('oauth_token').nullable().alter()
      table.text('oauth_token_secret').nullable().alter()
    })
  }

  down () {
    this.alter('users_profile', (table) => {
      table.string('oauth_token').nullable().alter()
      table.string('oauth_token_secret').nullable().alter()
    })
  }
}

module.exports = ChangeAllTokenToTextInUserProfileSchema
