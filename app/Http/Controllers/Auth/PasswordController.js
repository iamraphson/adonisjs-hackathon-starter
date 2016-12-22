/**
 * Created by Raphson on 12/21/16.
 */
'use strict';
const Mail = use('Mail');
const Validator = use('Validator');
const fs = require('fs');
const Helpers = use('Helpers');
const UserRepository = make('App/Repositories/UserRepository');
const Env = use('Env');
const uuid = use('node-uuid');

class PasswordController {
    constructor () {
        const file = Helpers.resourcesPath('locales/en/validation.json');
        this.messages = JSON.parse(fs.readFileSync(file, 'utf8'));
    }

    * showResetForm (request, response){
        yield response.sendView('auth.passwords.email');
    }

    * sendResetLinkEmail(request, response) {
        const postData = request.only('email');
        const rules = {
            email : 'required|email'
        };

        const validation = yield Validator.validate(postData, rules, this.messages);

        if (validation.fails()) {
            yield request.withOnly('email').andWith({ errors: validation.messages() }).flash();
            response.redirect('back');
            return;
        }
        //console.log(postData.email);
        const user = yield UserRepository.getUserByEmail(postData.email);
        if(user === null){
            yield request.with({warning: postData.email}).flash();
            response.redirect('back');
        } else {
            const token = yield UserRepository.findOrCreateToken(user);
            const emailResponse = yield this.sendResetMail(user, token);
            console.log(emailResponse);
            if (!emailResponse ||
                emailResponse.accepted instanceof Array === false ||
                !emailResponse.accepted.length) {
                yield request.with({error: 'Unable to deliver email to given email address'}).flash();
                response.redirect('back');
            }

            yield request.with({status: 'Email sent successfully'}).flash();
            response.redirect('back');
        }
    }

    * sendResetMail (user, token) {
        return yield Mail.send('auth.email.password', {email: user.email, token: token}, (message) => {
            message.to(user.email, user.name);
            message.from(Env.get('MAIL_FROM_EMAIL'), Env.get('MAIL_FROM_NAME'));
            message.subject('Your Password Reset Link');
        });
    }

}

module.exports = PasswordController;