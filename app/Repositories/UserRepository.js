/**
 * Created by Raphson on 12/20/16.
 */
const Hash = use('Hash')
const Exceptions = use('App/Exceptions')
const moment = require('moment')
const uuid = use('node-uuid')
const Database = use('Database')
const Env = use('Env')

class UserRepository {
    /**
     * injecting required dependencies auto fulfilled
     * by IoC container
     *
     * @return {Array}
     */
  static get inject () {
    return ['App/Model/User', 'App/Model/UsersProfile']
  }

  constructor (User, UsersProfile) {
    this.User = User
    this.UsersProfile = UsersProfile
    this.expires = Env.get('TOKEN_EXPIRES', 60) // in mins
  }

  * register (userInfo) {
    const user = new this.User()
    user.email = userInfo.email
    user.name = userInfo.name
    user.password = yield Hash.make(userInfo.password)
    yield user.save()

    if (user.isNew()) {
      throw new Exceptions.ApplicationException('Unable to create your account, please try after some time', 400)
    }

    const freshInstance = yield this.User.find(user.id)
    return freshInstance
  }

  * login (loginCredentials) {
    const user = yield this.User.findByOrFail('email', loginCredentials.email, function () {
      throw new Exceptions.ApplicationException('Unable to find any account with this email address', 400)
    })

    const isMatchedPassword = yield Hash.verify(loginCredentials.password, user.password)
    if (!isMatchedPassword) {
      throw new Exceptions.ApplicationException('Password mis-match', 400)
    }
    return user
  }

  * getUserByEmail (email) {
    const user = yield this.User.query().where('email', email).first()
    return user
  }

  * findOrCreateToken (user) {
    yield Database.table('password_resets').where('email', user.email).delete()
    const token = yield this.getToken()
    yield Database.table('password_resets')
            .insert({email: user.email, token: token, created_at: moment().format('YYYY-MM-DD HH:mm:ss')})
    return token
  }

  * getToken () {
    return uuid.v1()
  }

  * userResetPasswordExists (postData) {
    const token = yield Database.table('password_resets')
            .where({'email': postData.email, 'token': postData.token}).first().limit(1)
    if (token != null) {
      const isPast = yield this.tokenExpired(token)
      return token && !isPast
    }
    return true
  }

  * tokenExpired (token) {
    return moment().isAfter(moment(token.created_at).add(this.expires, 'minutes'))
  }

  * deleteResetToken (postData) {
    yield Database.table('password_resets')
            .where({'email': postData.email, 'token': postData.token}).delete()
  }

  * resetPassword (postData) {
    const user = yield this.User.query().where('email', postData.email).first()
    if (user != null) {
      user.password = yield Hash.make(postData.password)
      yield user.save()

      yield this.deleteResetToken(postData)
    }
    return user
  }

  * findUserById (id) {
    const user = yield this.User.find(id)
    return user
  }

  * updateUserProfile (loginID, userData) {
    const user = yield this.User.find(loginID.id)
    user.email = userData.email
    user.name = userData.name
    user.username = userData.username
    user.gender = userData.gender
    user.location = userData.location
    user.website = userData.website

    yield user.save() // update sql
  }

  * changeUserPassword (loginID, userData) {
    const user = yield this.User.find(loginID.id)
    user.password = yield Hash.make(userData.password)

    yield user.save() // update sql
  }

  * saveAvatar (loginID, avatarUrl) {
    const user = yield this.User.find(loginID.id)
    user.avatar = avatarUrl

    yield user.save() // update sql
  }

  * deleteUser (loginID) {
    const user = yield this.User.find(loginID.id)
    yield user.delete()
  }

  * findOrCreateUser(userData, provider){
      const profile_ = yield this.UsersProfile.query()
          .where({'provider': provider, 'provider_id': userData.getId()}).first();
      if(!(profile_ === null)){
        const realUser = yield profile_.user().fetch();
        return realUser
      }

      const user = new this.User()
      user.name = userData.getName(),
      user.username = userData.getNickname()
      user.avatar = userData.getAvatar()
      user.email = userData.getEmail()
      yield user.save()

      const profile = new this.UsersProfile()
      profile.provider            = provider
      profile.provider_id         = userData.getId()
      profile.oauth_token         = userData.getAccessToken()
      profile.oauth_token_secret  = userData.getTokenSecret()

      yield user.profile().save(profile)

      return user;
  }

}

module.exports = UserRepository

