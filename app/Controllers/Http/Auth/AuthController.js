'use strict'

const { validateAll } = use('Validator')
const users = make('App/Services/UserService')
const User = use('App/Models/User')

class AuthController {
  async showLogin ({ view }) {
    return view.render('auth.login')
  }

  async postLogin ({request, session, auth, response}) {
    const userInfo = request.all()
    const rules = {
      email: 'required',
      password: 'required'
    }

    const validation = await validateAll(userInfo, rules)

    if (validation.fails()) {
      session
        .withErrors(validation.messages())
        .flashExcept(['password'])

      return response.redirect('back')
    }

    try {
      await users.login(userInfo, auth)
      return response.redirect('/')
    } catch (error) {
      session.flash({ error: 'Invalid Login Credentials' })
      return response.redirect('back')
    }
  }

  async showRegister ({ view }) {
    return view.render('auth.register')
  }

  async postRegister ({request, session, response}) {
    const userInfo = request.only(['name', 'email', 'password', 'password_confirmation'])
    const rules = {
      name: 'required|max:255',
      email: 'required|email|max:255|unique:users',
      password: 'required|min:6|max:30',
      password_confirmation: 'required_if:password|min:6|max:30|same:password'
    }

    const validation = await validateAll(userInfo, rules)

    if (validation.fails()) {
      session
        .withErrors(validation.messages())
        .flashExcept(['password'])

      return response.redirect('back')
    }

    await users.register(userInfo)

    response.redirect('/login')
  }

  async logout ({ auth, response }) {
    await auth.logout()
    response.redirect('/login')
  }

  async redirectToProvider ({ request, session, ally, params }) {
    const { redirect } = request.only(['redirect'])
    if (redirect) {
      session.put('oldPath', redirect)
    }

    await ally.driver(params.provider).redirect()
  }

  async handleProviderCallback ({params, ally, auth, session, response }) {
    const provider = params.provider
    try {
      const providerUser = await ally.driver(params.provider).getUser()
      try {
        await auth.check()
        const isLoggedIn = await auth.getUser()
        await users.updateUserProvider(providerUser, provider, isLoggedIn.id)
        const redirectPath = await session.get('oldPath', '/account')
        return response.redirect(redirectPath)
      } catch (error) {
        const authUser = await users.findOrCreateUser(providerUser, provider)
        await auth.loginViaId(authUser.id)
        return response.redirect('/')
      }
    } catch (e) {
      console.log(e)
      response.redirect('/auth/' + provider)
    }
  }
}

module.exports = AuthController
