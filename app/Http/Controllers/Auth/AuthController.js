'use strict';
const Validator = use('Validator');

class AuthController {

    *
    show(request, response) {
        yield response.sendView('auth.login');
    }

    *
    postLogin(request, response) {
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

}

module.exports = AuthController;