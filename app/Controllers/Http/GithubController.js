'use strict'

const octokit = require('@octokit/rest')()
const api = make('App/Services/ApiService')
class GithubController {
  async index ({ request, response, auth, view }) {
    try {
      let user = await auth.getUser()
      const token = await api.getToken('github', user.id)
      if (token === null) {
        response.redirect('/auth/github?redirect=' + request.originalUrl())
      }

      try {
        const githubResponse = await this.getGithubProfile()
        return view.render('api.github', { repo: githubResponse.data })
      } catch (e) {
        console.log(e.message)
        return view.render('api.github', { repo: {} })
      }
    } catch (e) {
      console.log(e)
      response.redirect('/login')
    }
  }

  async getGithubProfile () {
    return await octokit.repos.get({ owner: 'iamraphson', repo: 'adonisjs-hackathon-starter' })
  }
}

module.exports = GithubController
