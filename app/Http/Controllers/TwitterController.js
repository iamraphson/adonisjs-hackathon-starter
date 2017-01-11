/**
 * Created by Raphson on 1/10/17.
 */
const Twit = require('twit');
const ApiRepository = make('App/Repositories/ApiRepository')
const Env = use('Env')
const fs = require('fs')
const Helpers = use('Helpers')
const Validator = use('Validator')

class TwitterController {

    constructor () {
        const file = Helpers.resourcesPath('locales/en/validation.json')
        this.messages = JSON.parse(fs.readFileSync(file, 'utf8'))
    }


    * index (request, response) {
        const user = yield request.auth.getUser();
        const token = yield ApiRepository.getToken('twitter', user.id);
        //console.log(token);
        if(token === null){
            response.redirect('/auth/twitter?redirect=' + request.originalUrl());
        }
        try {
            const profileResponse = yield this.getTwitterProfile(token);
            yield response.sendView('api.twitterApi', { tweets: profileResponse.reply.statuses})
        } catch(e){
            console.log(e.message);
            yield response.sendView('api.twitterApi', { tweets: []})
        }
    }

    * sendTweet(request, response) {
        const userData = request.only('tweet')
        const rules = {
            tweet: 'required'
        }

        const validation = yield Validator.validate(userData, rules, this.messages)

        if (validation.fails()) {
            yield request.with({ errors: validation.messages() }).flash()
            response.redirect('back')
            return
        }

        const user = yield request.auth.getUser();
        const token = yield ApiRepository.getToken('twitter', user.id);

        try {
            yield this.postTweet(token, userData.tweet);
            yield request.with({ status: 'Your Tweet has been sent' }).flash()
            response.redirect('back')
        } catch(e){
            console.log(e.message);
            yield request.with({ errors: 'Error in sending tweets' }).flash()
            response.redirect('back')
        }

    }

    postTweet(token, tweet){
        return new Promise((resolve, reject) => {
            const T = this.configTwit(token)

            T.post('statuses/update', { status: tweet }, (err) => {
                if (err) { return  reject(err); }
                return resolve({status: 'Tweet sent'})
            })
        })
    }

    getTwitterProfile(token) {
        return new Promise((resolve, reject) => {
            const T = this.configTwit(token);

            T.get('search/tweets', { q: 'Adonisframework since:2011-07-11', count: 10 }, (err, reply) => {
                if (err) { return  reject(err); }
                return resolve({reply})
            });
        })
    }

    configTwit(token){
        return  new Twit({
            consumer_key: Env.get('TWITTER_CLIENT_ID'),
            consumer_secret: Env.get('TWITTER_CLIENT_SECRET'),
            access_token: token.oauth_token,
            access_token_secret: token.oauth_token_secret
        });
    }
}

module.exports = TwitterController
