/**
 * Created by Raphson on 1/19/17.
 */
const ApiRepository = make('App/Repositories/ApiRepository')
const Env = use('Env')
const ig = require('instagram-node').instagram()
const async = require('async');

class InstagramController {

    constructor () {
        ig.use({ client_id: Env.get('INSTAGRAM_CLIENT_ID'), client_secret: Env.get('INSTAGRAM_CLIENT_SECRET') });
    }

    * index (request, response) {
        const user = yield request.auth.getUser();
        const token = yield ApiRepository.getToken('instagram', user.id);
        if(token === null){
            response.redirect('/auth/instagram?redirect=' + request.originalUrl());
        }
        try {
            const igResponse = yield this.getData(token);
            console.log(igResponse)
            //yield response.sendView('api.foursquareApi', { locations: foursquareResponse.results.venues})
        } catch(e){
            console.log('error', e.message);
            //yield response.sendView('api.foursquareApi', { locations: []})
        }
    }

    getData (token){
        ig.use({ access_token: token.oauth_token });
        return new Promise((resolve, reject) => {
            async.parallel({
                searchByUsername: (done) => {
                    ig.user_search('iamraphson', (err, users) => {
                        done(err, users);
                    });
                },
                searchByUserId: (done) => {
                    ig.user('224366365', (err, user) => {
                        done(err, user);
                    });
                },
                myRecentMedia: (done) => {
                    ig.user_self_media_recent((err, medias) => {
                        done(err, medias);
                    });
                }
            }, (err, results) => {
                if (err) { return reject(err); }
                return resolve({
                    usernames: results.searchByUsername,
                    userById: results.searchByUserId,
                    myRecentMedia: results.myRecentMedia
                });
            });
        })
    }

}

module.exports = InstagramController