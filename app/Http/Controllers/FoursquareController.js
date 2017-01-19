/**
 * Created by Raphson on 1/16/17.
 */

const ApiRepository = make('App/Repositories/ApiRepository')
const Env = use('Env')
const foursquare = require('node-foursquare')({
    secrets: {
        clientId: Env.get('FOURSQUARE_ID'),
        clientSecret: Env.get('FOURSQUARE_SECRET'),
        redirectUrl: `${Env.get('APP_URL')}/auth/foursquare/callback`
    }
});

class FoursquareController {

    * index (request, response) {
        const user = yield request.auth.getUser();
        const token = yield ApiRepository.getToken('foursquare', user.id);
        if(token === null){
            response.redirect('/auth/foursquare?redirect=' + request.originalUrl());
        }
        try {
            const foursquareResponse = yield this.getData(token,'Lagos, Nigeria');
            yield response.sendView('api.foursquareApi', { locations: foursquareResponse.results.venues})
        } catch(e){
            console.log('error', e.message);
            yield response.sendView('api.foursquareApi', { locations: []})
        }
    }

    getData (token, endpoint){
        return new Promise((resolve, reject) => {
            foursquare.Venues.search('6.453396605899419', '3.395676612854003', endpoint, {},
                token.accessToken, (err, results) => {
                if (err) { return  reject(err); }
                return resolve({results})
            });
        })
    }


}

module.exports = FoursquareController