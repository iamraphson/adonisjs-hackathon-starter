'use strict'
const { validateAll } = use('Validator')
const Mail = use('Mail')

class ContactController {
  async index ({ view, auth }) {
    try {
      console.log(await auth.getUser())
    } catch (error) {
      console.log('You are not logged in')
    }
    return view.render('contact.index')
  }

  async sendMessage ({ request, session, response}) {
    const mesgInfo = request.only(['name', 'email', 'message'])
    const rules = {
      name: 'required|min:3',
      email: 'required|email|max:255',
      message: 'required'
    }

    const validation = await validateAll(mesgInfo, rules)

    if (validation.fails()) {
      session
        .withErrors(validation.messages())
        .flashAll()

      return response.redirect('back')
    }

    await Mail.send('mail.contacttemplate', {
      body: mesgInfo.message
    }, (message) => {
      message.to('nsegun5@gmail.com')
      message.from('noreply@hackathonstarter.com', mesgInfo.name)
      message.subject('Message From AdonisJS Hackathon Starter Contact Form - ' + mesgInfo.email)
    })

    session.flash({ status: 'Your Message has been sent successfully' })
    return response.redirect('back')
  }
}

module.exports = ContactController
