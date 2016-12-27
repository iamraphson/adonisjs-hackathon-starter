'use strict'

const Schema = use('Schema')

class UsersProfileTableSchema extends Schema {

  up () {
    this.create('users_profile', (table) => {
      table.increments('profile_id')
      table.integer('user_id').unsigned()
      table.string('provider_id').Nullable()
      table.string('provider').Nullable()
      table.string('oauth_token').Nullable()
      table.string('oauth_token_secret').Nullable()
      table.timestamps()
      table.foreign('user_id').references('users.id')
    })
  }

  down () {
    this.drop('users_profile')
  }

}

module.exports = UsersProfileTableSchema
