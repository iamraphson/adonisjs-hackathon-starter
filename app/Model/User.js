'use strict';

const Lucid = use('Lucid');

class User extends Lucid {
    static get table () {
        return 'id'
    }
}

module.exports = User;
