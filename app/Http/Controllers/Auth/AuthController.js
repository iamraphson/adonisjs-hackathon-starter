'use strict';
const Validator = use('Validator');
const fs = require('fs');
const Helpers = use('Helpers')

class AuthController {

    constructor () {
        const file = Helpers.resourcesPath('locales/en/validation.json');
         this.messages = JSON.parse(fs.readFileSync(file, 'utf8'));
    }

    * showLogin(request, response) {
        yield response.sendView('auth.login');
    }

    * postLogin(request, response) {
        const postData = request.only('email', 'password');
        const rules = {
            email: 'required',
            password: 'required'
        };

        const validation = yield Validator.validate(postData, rules);

        if (validation.fails()) {
            yield request.withOnly('email').andWith({ errors: validation.messages() }).flash();
            console.log(validation.messages());
            response.redirect('back');
            return;
        }
    }

    * getRegister (request, response) {
        yield response.sendView('auth.register');
    }

    * postRegister (request, response) {
        const postData = request.only('name', 'email', 'password', 'password_confirmation');
        const rules = {
            name                : 'required|max:255',
            email               : 'required|email|max:255',
            password            : 'required|min:6|max:30|confirmed'
        };

        const validation = yield Validator.validate(postData, rules, this.messages);

        if (validation.fails()) {
            yield request.withOnly('name', 'email').andWith({ errors: validation.messages() }).flash();
            response.redirect('back');
            return;
        }
    }
}

module.exports = AuthController;