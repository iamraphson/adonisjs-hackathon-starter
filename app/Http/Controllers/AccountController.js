/**
 * Created by Raphson on 12/23/16.
 */
'use strict';

const Validator = use('Validator');
const fs = require('fs');
const Helpers = use('Helpers');
const UserRepository = make('App/Repositories/UserRepository');

class AccountController {

    constructor () {
        const file = Helpers.resourcesPath('locales/en/validation.json');
        this.messages = JSON.parse(fs.readFileSync(file, 'utf8'));
    }

    * edit(request, response) {
        this.loginID = yield request.auth.getUser();
        const loggedinUser =  yield UserRepository.findUserById(this.loginID.id);
        yield  response.sendView('account.profile', {account: loggedinUser});
    }

    * update(request, response) {
        const userData = request.only('email', 'name', 'username',
            'gender', 'location', 'website');
        const rules = {
            name    : 'required|max:255',
            email   : 'required|email|max:255'
        };

        const validation = yield Validator.validate(userData, rules, this.messages);

        if (validation.fails()) {
            yield request.with({ errors: validation.messages() }).flash();
            response.redirect('back');
            return;
        }

        this.loginID = yield request.auth.getUser();
        yield UserRepository.updateUserProfile(this.loginID, userData);
        yield request.with({ status: 'Your Profile has been updated successfully' }).flash();
        response.redirect('back');
    }

    * changePassword(request, response){
        const userPasswords = request.only('password', 'password_confirmation');
        const rules = {
            password : 'required|min:6|max:30|confirmed'
        };

        const validation = yield Validator.validate(userPasswords, rules, this.messages);

        if (validation.fails()) {
            yield request.with({ errors: validation.messages() }).flash();
            response.redirect('back');
            return;
        }

        this.loginID = yield request.auth.getUser();
        yield UserRepository.changeUserPassword(this.loginID, userPasswords);
        yield request.with({ status: 'Password has been changed successfully' }).flash();
        response.redirect('back');
    }

    * destroy(request, response) {
        //
    }
}

module.exports = AccountController;