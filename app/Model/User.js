'use strict';

const Lucid = use('Lucid');
const md5 = require("blueimp-md5");
const trim = require("trim");

class User extends Lucid {
    static get table () {
        return 'users'
    }

    static get primaryKey () {
        return 'id'
    }

    /**
     * The attributes that should be hidden for arrays.
     *
     * @var array
     */
    static get hidden () {
        return ['password']
    }

    getAvatar1 () {
        if(!this.avatar){
            console.log()
            return "http://www.gravatar.com/avatar/" +
                md5(this.email) +  "?d=mm&s=60";
        }
        return this.avatar;
    }

}

module.exports = User;
