'use strict'

const Schema = use('Schema');

class UsersTableSchema extends Schema {

      up () {
            this.create('users', (table) => {
                table.increments();
                table.string('email').notNullable().unique();
                table.string('password', 72).notNullable();
                table.string('name').notNullable();
                table.string('username').notNullable();
                table.string('avatar').notNullable();
                table.string('gender').notNullable();
                table.string('location').notNullable();
                table.string('website').notNullable();
                table.timestamps();
            })
      }

      down () {
        this.drop('users')
      }

}

module.exports = UsersTableSchema;
