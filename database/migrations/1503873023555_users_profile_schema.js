'use strict'

const Schema = use('Schema')

class UsersProfileSchema extends Schema {
  up () {
    this.createTableIfNotExists('users_profile', table => {
      table.increments('profile_id')
      table.integer('user_id').unsigned()
      table.string('provider_id').nullable()
      table.string('provider').nullable()
      table.string('oauth_token').nullable()
      table.string('oauth_token_secret').nullable()
      table.timestamps()
      table.foreign('user_id').references('users.id')
    })
  }

  down () {
    this.drop('users_profile')
  }
}

module.exports = UsersProfileSchema
