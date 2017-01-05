/**
 * Created by Raphson on 12/23/16.
 */
'use strict'

const Validator = use('Validator')
const fs = require('fs')
const Helpers = use('Helpers')
const UserRepository = make('App/Repositories/UserRepository')
const path = require('path')
const cloudinary = require('cloudinary').v2
  const thunkify = require('thunkify')

class AccountController {

  constructor () {
    const file = Helpers.resourcesPath('locales/en/validation.json')
    this.messages = JSON.parse(fs.readFileSync(file, 'utf8'))
  }

  * edit (request, response) {
    this.loginID = yield request.auth.getUser()
    const loggedinUser = yield UserRepository.findUserById(this.loginID.id)
    yield response.sendView('account.profile', {account: loggedinUser})
  }

  * update (request, response) {
    const userData = request.only('email', 'name', 'username',
            'gender', 'location', 'website')
    const rules = {
      name: 'required|max:255',
      email: 'required|email|max:255'
    }

    const validation = yield Validator.validate(userData, rules, this.messages)

    if (validation.fails()) {
      yield request.with({ errors: validation.messages() }).flash()
      response.redirect('back')
      return
    }

    this.loginID = yield request.auth.getUser()
    yield UserRepository.updateUserProfile(this.loginID, userData)
    yield request.with({ status: 'Your Profile has been updated successfully' }).flash()
    response.redirect('back')
  }

  * changePassword (request, response) {
    const userPasswords = request.only('password', 'password_confirmation')
    const rules = {
      password: 'required|min:6|max:30|confirmed'
    }

    const validation = yield Validator.validate(userPasswords, rules, this.messages)

    if (validation.fails()) {
      yield request.with({ errors: validation.messages() }).flash()
      response.redirect('back')
      return
    }

    this.loginID = yield request.auth.getUser()
    yield UserRepository.changeUserPassword(this.loginID, userPasswords)
    yield request.with({ status: 'Password has been changed successfully' }).flash()
    response.redirect('back')
  }

    /*
     * Avatar upload using cloudinary(https://www.cloudinary.com)
     */

  * uploadAvatar (request, response) {
    var imageFile = request.file('avatar').tmpPath()
        // Upload file to Cloudinary
    const upload = thunkify(cloudinary.uploader.upload)
    try {
      const image = yield upload(imageFile)
      const loginID = yield request.auth.getUser()
      yield UserRepository.saveAvatar(loginID, image.url)
      yield request.with({status: 'Avatar has been updated successfully'}).flash()
      response.redirect('back')
    } catch (e) {
      console.log(e)
      yield request.with({status: 'Error in updating your avatar '}).flash()
      response.redirect('back')
    }
  }

  * destroy (request, response) {
    const loginID = yield request.auth.getUser()
    yield UserRepository.deleteUser(loginID)
    yield request.auth.logout()
    response.redirect('/')
  }
}

module.exports = AccountController
