'use strict'
const GitHub = require('github');
const ApiRepository = make('App/Repositories/ApiRepository')

class GithubController {
    constructor () {

    }

    * index (request, response) {
        const user = yield request.auth.getUser();
        console.log(ApiRepository.getToken('twitter', user.id));
        try {
            const profileResponse = yield this.getGithubProfile()
            yield response.sendView('api.githubApi', { repo: profileResponse.repo})
        } catch(e){
            console.log(e.message);
        }
    }

    getGithubProfile() {
        return new Promise((resolve, reject) => {
            const github = new GitHub();
            github.repos.get({ owner: 'sahat', repo: 'hackathon-starter' }, (err, repo) => {
                if (err) { return  reject(err); }
                return  resolve({repo})
            });
        })
    }
}

module.exports = GithubController
