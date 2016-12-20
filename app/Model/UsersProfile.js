'use strict'

const Lucid = use('Lucid')

class UsersProfile extends Lucid {
    static get table () {
        return 'users_profile'
    }

    static get primaryKey () {
        return 'profile_id'
    }
}

module.exports = UsersProfile
