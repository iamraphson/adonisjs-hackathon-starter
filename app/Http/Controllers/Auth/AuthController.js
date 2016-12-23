'use strict';
const Validator = use('Validator');
const fs = require('fs');
const Helpers = use('Helpers');
const UserRepository = make('App/Repositories/UserRepository');

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

        const validation = yield Validator.validate(postData, rules, this.messages);

        if (validation.fails()) {
            yield request.withOnly('email').andWith({ errors: validation.messages() }).flash();
            console.log(validation.messages());
            response.redirect('back');
            return;
        }

        try {
            yield request.auth.attempt(postData.email, postData.password);
            response.redirect('/')
        } catch (e) {
            yield request.with({error: e.message}).flash();
            response.redirect('back');
        }
    }

    * getRegister (request, response) {
        yield response.sendView('auth.register');
    }

    * postRegister (request, response) {
        const postData = request.only('name', 'email', 'password', 'password_confirmation');
        const rules = {
            name                : 'required|max:255',
            email               : 'required|email|max:255|unique:users',
            password            : 'required|min:6|max:30|confirmed'
        };

        const validation = yield Validator.validate(postData, rules, this.messages);

        if (validation.fails()) {
            yield request.withOnly('name', 'email').andWith({ errors: validation.messages() }).flash();
            response.redirect('back');
            return;
        }
        yield UserRepository.register(postData);
        response.redirect('/login');
    }

    * logout (request, response) {
        yield request.auth.logout();
        response.redirect('/');
    }
}

module.exports = AuthController;