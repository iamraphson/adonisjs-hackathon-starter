/**
 * Created by Raphson on 1/13/17.
 */
'use strict'

const ApiRepository = make('App/Repositories/ApiRepository')
const Env = use('Env')
const graph = require('fbgraph');

class FacebookController {

    * index (request, response) {
        const user = yield request.auth.getUser();
        const token = yield ApiRepository.getToken('facebook', user.id);
        if(token === null){
            response.redirect('/auth/facebook?redirect=' + request.originalUrl());
        }
        try {
            const profileResponse = yield this.getFacebookProfile(token);
            yield response.sendView('api.facebookApi', { details: profileResponse.results})
        } catch(e){
            console.log(e.message);
            yield ApiRepository.deleteToken('facebook', user.id);
            response.redirect('/auth/facebook?redirect=' + request.originalUrl());
        }
    }

    getFacebookProfile(token) {
        return new Promise((resolve, reject) => {
            graph.setAccessToken(token.oauth_token)
            graph.get(`/me?fields=id,name,email,first_name,last_name,gender,link,locale,timezone`, (err, results) => {
                if (err) { return  reject(err); }
                return resolve({results})
            });
        })
    }


}

module.exports = FacebookController
