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
        return ['App/Model/User', 'App/Model/UsersProfile']
    }

    constructor (UsersProfile) {
        this.UsersProfile = UsersProfile
    }

    * getToken(provider, authID){
        console.dir(provider, authID);
        return  this.UsersProfile.query()
            .where({'provider': provider, 'user_id': authID}).first();
    }
}

module.exports = ApiRepository