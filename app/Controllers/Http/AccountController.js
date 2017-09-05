'use strict'

const { validateAll } = use('Validator')
const users = make('App/Services/UserService')

class AccountController {
  async edit ({ auth, view, response }) {
    try {
      let loginID = await auth.getUser()
      let loggedinUser = await users.findUserById(loginID.id)
      let linkedAccount = await users.getAllLinkedAccount(loginID)
      return view.render('account.profile', {account: loggedinUser, linkedAccount: linkedAccount})
    } catch (e) {
      console.log(e)
      response.redirect('/login')
    }
  }

  async update ({ request, session, response, auth }) {
    const userInfo = request.only(['email', 'name', 'username', 'gender', 'location', 'website'])
    const rules = {
      name: 'required|max:255',
      email: 'required|email|max:255'
    }

    const validation = await validateAll(userInfo, rules)

    if (validation.fails()) {
      session
        .withErrors(validation.messages())
        .flashExcept(['password'])

      return response.redirect('back')
    }

    try {
      const loginID = await auth.getUser()
      await users.updateUserProfile(loginID, userInfo)
      session.flash({ status: 'Your Profile has been updated successfully' })
      return response.redirect('back')
    } catch (e) {
      session.flash({ error: 'Error while updating profile' })
      return response.redirect('back')
    }
  }

  /**
   * Avatar upload using cloudinary(https://www.cloudinary.com)
   */
  async uploadAvatar ({ request, session, response, auth }) {
    const profilePic = request.file('avatar', {
      types: ['image'],
      size: '2mb'
    })

    if (Object.keys(profilePic.error()).length !== 0) {
      session.flash({ error: 'Invalid File type' })
      return response.redirect('back')
    }

    try {
      const cloudinaryResponse = await users.uploadToCloudinary(profilePic._tmpPath)
      const loginID = await auth.getUser()
      await users.saveAvatar(loginID, cloudinaryResponse.url)
      session.flash({status: 'Avatar has been updated successfully'})
      return response.redirect('back')
    } catch (e) {
      console.log(e)
      session.flash({ error: 'Internal error while uploading' })
      return response.redirect('back')
    }
  }

  async changePassword ({request, session, response, auth }) {
    const userInfo = request.only(['password', 'password_confirmation'])
    const rules = {
      password: 'required|min:6|max:30',
      password_confirmation: 'required_if:password|min:6|max:30|same:password'
    }

    const validation = await validateAll(userInfo, rules)

    if (validation.fails()) {
      session
        .withErrors(validation.messages())
        .flashExcept(['password', 'password_confirmation'])

      return response.redirect('back')
    }

    const loginID = await auth.getUser()
    await users.changeUserPassword(loginID, userInfo)
    session.flash({ status: 'Password has been changed successfully' })
    return response.redirect('back')
  }

  async unlinkSocialMediaAccount ({ params, auth, response }) {
    const provider = params.provider
    const loginID = await auth.getUser()
    await users.unlinkAccount(provider, loginID)
    response.redirect('back')
  }

  async destroy ({ auth, response }) {
    const loginID = await auth.getUser()
    await users.deleteUser(loginID)
    await auth.logout()
    response.redirect('/')
  }
}

module.exports = AccountController
