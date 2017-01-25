/**
 * Created by Raphson on 1/25/17.
 */
const ApiRepository = make('App/Repositories/ApiRepository')
const Env = use('Env')
const Linkedin = require('node-linkedin')(Env.get('LINKEDIN_ID'), Env.get('LINKEDIN_SECRET'))


class LinkedinController {

    * index (request, response) {
        const user = yield request.auth.getUser();
        const token = yield ApiRepository.getToken('linkedin', user.id);
        if(token === null){
            response.redirect('/auth/linkedin?redirect=' + request.originalUrl());
        }

        try {
            const $inResponse = yield this.getData(token);
            yield response.sendView('api.linkedinApi', {profile: $inResponse.profile})
        } catch(e){
            console.log('error', e.message);
            yield response.sendView('api.linkedinApi', {profile: {} })
        }
    }

    getData (token) {
        const linkedin = Linkedin.init(token.oauth_token);
        return new Promise((resolve, reject) => {
            linkedin.people.me((err, $in) => {
                if (err) { return reject(err); }
                return resolve({
                    profile: $in
                })
            });
        })
    }
}

module.exports = LinkedinController