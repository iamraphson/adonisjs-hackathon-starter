'use strict'

const Helpers = use('Helpers')

class UploadController {
  async index({ view }) {
    return view.render('api.upload')
  }

  async upload ({ request, response, session }) {
    const profilePic = request.file('myFile', {
      size: '2mb'
    })

    let name = `${new Date().getTime()}_${profilePic._clientName}`
    await profilePic.move(Helpers.tmpPath('/uploads'), {
      name
    })

    if (!profilePic.moved()) {
      session.flash({ error: profilePic.error().message }).flash()
      return response.redirect('back')
    }

    console.log(profilePic.toJSON())
    session.flash({ status: 'Uploaded to this path: ' + `${Helpers.tmpPath('/uploads')}/${name}` })
    return response.redirect('back')
  }
}

module.exports = UploadController
