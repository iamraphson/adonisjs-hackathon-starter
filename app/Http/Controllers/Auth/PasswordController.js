/**
 * Created by Raphson on 12/21/16.
 */
'use strict'
const Mail = use('Mail')
const Validator = use('Validator')
const fs = require('fs')
const Helpers = use('Helpers')
const UserRepository = make('App/Repositories/UserRepository')
const Env = use('Env')
const uuid = use('node-uuid')

class PasswordController {
  constructor () {
    const file = Helpers.resourcesPath('locales/en/validation.json')
    this.messages = JSON.parse(fs.readFileSync(file, 'utf8'))
  }

  * showResetForm (request, response) {
    yield response.sendView('auth.passwords.email')
  }

  * sendResetLinkEmail (request, response) {
    const postData = request.only('email')
    const rules = {
      email: 'required|email'
    }

    const validation = yield Validator.validate(postData, rules, this.messages)

    if (validation.fails()) {
      yield request.withOnly('email').andWith({ errors: validation.messages() }).flash()
      response.redirect('back')
      return
    }
        // console.log(postData.email);
    const user = yield UserRepository.getUserByEmail(postData.email)
    if (user === null) {
      yield request.with({warning: postData.email}).flash()
      response.redirect('back')
    } else {
      const token = yield UserRepository.findOrCreateToken(user)
      const emailResponse = yield this.sendResetMail(user, token)
      if (!emailResponse ||
                emailResponse.accepted instanceof Array === false ||
                !emailResponse.accepted.length) {
        yield request.with({error: 'Unable to deliver email to given email address'}).flash()
        response.redirect('back')
      }

      yield request.with({status: 'We have e-mailed your password reset link!'}).flash()
      response.redirect('back')
    }
  }

  * sendResetMail (user, token) {
    return yield Mail.send('auth.email.password', {
    	email: user.email,
	    token: token,
	    host: Env.get('APP_URL')
    }, (message) => {
      message.to(user.email, user.name)
      message.from(Env.get('MAIL_FROM_EMAIL'), Env.get('MAIL_FROM_NAME'))
      message.subject('Your Password Reset Link')
    })
  }

  * showResetView (request, response) {
    const token = request.param('token')
    const email = request.input('email')
    yield response.sendView('auth.passwords.reset', { token: token, email: email})
  }

  * reset (request, response) {
    const postData = request.only('email', 'password', 'password_confirmation', 'token')
    const rules = {
      email: 'required|email',
      password: 'required|min:6|max:30|confirmed'
    }

    const validation = yield Validator.validate(postData, rules, this.messages)

    if (validation.fails()) {
      yield request.withOnly('email').andWith({ errors: validation.messages() }).flash()
      response.redirect('back')
      return
    }

    const isResetOkay = yield UserRepository.userResetPasswordExists(postData)
    if (isResetOkay) {
      const user = yield UserRepository.resetPassword(postData)
      if (user === null) {
        yield request.withOnly('email')
                    .andWith({ error: 'We can\'t find a user with that e-mail address' }).flash()
        response.redirect('back')
      } else {
        yield request.with({ status: 'Your password has been reset!' }).flash()
        response.redirect('/login')
      }
    } else {
      yield request.withOnly('email')
                .andWith({ error: 'This password reset token is invalid' }).flash()
      response.redirect('back')
    }
  }

}

module.exports = PasswordController