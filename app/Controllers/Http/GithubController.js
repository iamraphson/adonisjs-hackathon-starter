'use strict'

const GitHub = require('github')
const api = make('App/Services/ApiService')

class GithubController {
  async index ({request, response, auth, view}) {
    try {
      let user = await auth.getUser()
      const token = await api.getToken('github', user.id)
      if (token === null) {
        response.redirect('/auth/github?redirect=' + request.originalUrl())
      }

      try {
        const profileResponse = await this.getGithubProfile()
        return view.render('api.github', {repo: profileResponse.repo.data})
      } catch (e) {
        console.log(e.message)
        return view.render('api.github', {repo: {}})
      }
    } catch (e) {
      console.log(e)
      response.redirect('/login')
    }
  }

  getGithubProfile () {
    return new Promise((resolve, reject) => {
      const github = new GitHub()
      github.repos.get({ owner: 'iamraphson', repo: 'adonisjs-hackathon-starter' }, (err, repo) => {
        if (err) { return reject(err) }
        return resolve({repo})
      })
    })
  }
}

module.exports = GithubController
