'use strict'

const View = use('View')

class ViewAssets {

    * handle(request, response, next) {

        let baseUrl = request.secure() ? 'https://' : 'http://';
        baseUrl += request.headers().host + '/';

        View.global('assets', (assetPath) => {
            assetPath = (assetPath.substring(0, 1) == '/') ? assetPath.substring(1) : assetPath;
            return baseUrl + assetPath;
        })

        yield next
    }

}

module.exports = ViewAssets;