'use strict'

const Model = use('Model')
const md5 = require('blueimp-md5')

class User extends Model {
  static get table () {
    return 'users'
  }

  static get primaryKey () {
    return 'id'
  }

  /**
   * The attributes that should be hidden for arrays.
   *
   * @var array
   */
  static get hidden () {
    return ['password']
  }

  static get computed () {
    return ['avatarpath']
  }

  getAvatarpath ({ avatar, email }) {
    if (!avatar) {
      return `http://www.gravatar.com/avatar/${md5(email)}?d=mm&s=60`
    }
    return avatar
  }

  profile () {
    return this.hasMany('App/Models/UsersProfile', 'id', 'user_id')
  }
}

module.exports = User
