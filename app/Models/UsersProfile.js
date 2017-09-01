'use strict'

const Model = use('Model')

class UsersProfile extends Model {
  static get table () {
    return 'users_profile'
  }

  static get primaryKey () {
    return 'profile_id'
  }

  user () {
    return this.belongsTo('App/Models/User')
  }
}

module.exports = UsersProfile
