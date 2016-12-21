'use strict'

const Schema = use('Schema');

class UsersTableSchema extends Schema {

      up () {
            this.create('users', (table) => {
                table.increments();
                table.string('email').Nullable().unique();
                table.string('password', 72).Nullable();
                table.string('name').Nullable();
                table.string('username').Nullable();
                table.string('avatar').Nullable();
                table.string('gender').Nullable();
                table.string('location').Nullable();
                table.string('website').Nullable();
                table.timestamps();
            })
      }

      down () {
        this.drop('users')
      }

}

module.exports = UsersTableSchema;
