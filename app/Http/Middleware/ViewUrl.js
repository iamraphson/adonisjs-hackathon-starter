'use strict'

const View = use('View')

class ViewUrl {

    * handle(request, response, next) {

        let baseUrl = request.secure() ? 'https://' : 'http://';
        baseUrl += request.headers().host + '/';

        View.global('url', (path) => {
            if (typeof path != 'undefined') {
                path = (path.substring(0, 1) == '/') ? path.substring(1) : path
                return baseUrl + path
            }
            return baseUrl
        });

        yield next
    }

}

module.exports = ViewUrl;