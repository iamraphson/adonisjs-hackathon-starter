'use strict'

class HomeController {
    * index(request, response) {
        yield response.sendView('welcome');
    }
}

module.exports = HomeController;
