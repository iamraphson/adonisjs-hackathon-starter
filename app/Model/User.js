'use strict';

const Lucid = use('Lucid');

class User extends Lucid {
    static get table () {
        return 'users'
    }

    static get primaryKey () {
    return 'id'
}
}

module.exports = User;
