/**
 * Created by Raphson on 1/10/17.
 */
const Twit = require('twit');
const ApiRepository = make('App/Repositories/ApiRepository')
const Env = use('Env')

class TwitterController {
    constructor () {

    }

    * index (request, response) {
        const user = yield request.auth.getUser();
        const token = yield ApiRepository.getToken('twitter', user.id);
        if(token === null){
            response.redirect('/auth/twitter?redirect=' + request.originalUrl());
        }
        try {
            const profileResponse = yield this.getGithubProfile(token);
            yield response.sendView('api.twitterApi', { tweets: profileResponse.reply.statuses})
        } catch(e){
            console.log(e.message);
        }
    }

    getGithubProfile(token) {
        return new Promise((resolve, reject) => {
            const T = new Twit({
                consumer_key: Env.get('TWITTER_CLIENT_ID'),
                consumer_secret: Env.get('TWITTER_CLIENT_SECRET'),
                access_token: token.oauth_token,
                access_token_secret: token.oauth_token_secret
            });

            T.get('search/tweets', { q: 'Adonisframework since:2011-07-11', count: 10 }, (err, reply) => {
                if (err) { return  reject(err); }
                return resolve({reply})
            });
        })
    }
}

module.exports = TwitterController
