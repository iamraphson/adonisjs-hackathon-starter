/**
 * Created by Raphson on 1/5/17.
 */
const Hash = use('Hash')
const Exceptions = use('App/Exceptions')
const uuid = use('node-uuid')
const Database = use('Database')
const Env = use('Env')

class ApiRepository {
    /**
     * injecting required dependencies auto fulfilled
     * by IoC container
     *
     * @return {Array}
     */
    static get inject () {
        return ['App/Model/UsersProfile', 'App/Model/User']
    }

    constructor (UsersProfile) {
        this.UsersProfile = UsersProfile
    }

    * getToken(provider, authID){
        const profile = yield this.UsersProfile.query()
            .where({'provider': provider, 'user_id': authID}).first();
        return  profile;
    }

    * deleteToken(provider, authID){
        const profile = yield this.UsersProfile.query()
            .where({'provider': provider, 'user_id': authID}).delete();
        return  profile;
    }
}

module.exports = ApiRepository