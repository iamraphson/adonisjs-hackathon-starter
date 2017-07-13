'use strict'

const Schema = use('Schema')

class UsersTableSchema extends Schema {

  up () {
    this.create('users', (table) => {
      table.increments()
      table.string('email').nullable()
      table.string('password', 72).nullable()
      table.string('name').nullable()
      table.string('username').nullable()
      table.string('avatar').nullable()
      table.string('gender').nullable()
      table.string('location').nullable()
      table.string('website').nullable()
      table.timestamps()
    })
  }

  down () {
    this.drop('users')
  }

}

module.exports = UsersTableSchema
