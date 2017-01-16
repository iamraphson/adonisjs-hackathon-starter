/**
 * Created by Raphson on 1/16/17.
 */

const ApiRepository = make('App/Repositories/ApiRepository')
const Env = use('Env')

class FoursquareController {

    * index (request, response) {
        const user = yield request.auth.getUser();
        const token = yield ApiRepository.getToken('foursquare', user.id);
        if(token === null){
            response.redirect('/auth/foursquare?redirect=' + request.originalUrl());
        }
        try {
            //const profileResponse = yield this.getFacebookProfile(token);
            //yield response.sendView('api.facebookApi', { details: profileResponse.results})
        } catch(e){
            console.log(e.message);
            //yield response.sendView('api.facebookApi', { details: {}})
        }
    }


}

module.exports = FoursquareController