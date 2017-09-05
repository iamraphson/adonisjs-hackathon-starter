'use strict'

const UsersProfile = use('App/Models/UsersProfile')

class ApiService {
  async getToken (provider, authID) {
    const profile = await UsersProfile.query().where({provider: provider, user_id: authID}).first()
    return profile
  }

  async deleteToken (provider, authID) {
    await UsersProfile.query().where({provider: provider, user_id: authID}).delete()
  }
}

module.exports = ApiService
