'use strict'
const GitHub = require('github');
const ApiRepository = make('App/Repositories/ApiRepository')

class GithubController {
    constructor () {

    }

    * index (request, response) {
        const user = yield request.auth.getUser();
        const token = yield ApiRepository.getToken('github', user.id);
        if(token === null){
            response.redirect('/auth/github?redirect=' + request.originalUrl());
        }
        try {
            const profileResponse = yield this.getGithubProfile()
            yield response.sendView('api.githubApi', { repo: profileResponse.repo.data})
        } catch(e){
            console.log(e.message);
            yield response.sendView('api.githubApi', { repo: {}})
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
