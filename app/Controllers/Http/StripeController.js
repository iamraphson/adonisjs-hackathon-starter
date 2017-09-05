'use strict'

const Env = use('Env')
const stripe = require('stripe')(Env.get('STRIPE_ID'))

class StripeController {
  async index ({ view }) {
    return view.render('api.stripe', { publishableKey: Env.get('STRIPE_ID') })
  }

  async postStripe ({ request, response, session }) {
    const stripeData = request.only(['stripeToken', 'stripeEmail'])
    try {
      await this.sendStripeData(stripeData)
      session.flash({ status: 'Your card has been successfully charged.' })
      return response.redirect('back')
    } catch (e) {
      console.log(e.message)
      session.flash({error: 'Your card has been declined.'}).flash()
      return response.redirect('back')
    }
  }

  sendStripeData (stripeData) {
    return new Promise((resolve, reject) => {
      stripe.charges.create({
        amount: 2000,
        currency: 'usd',
        source: stripeData.stripeToken,
        description: stripeData.stripeEmail
      }, (err) => {
        if (err && err.type === 'StripeCardError') { return reject(err) }
        return resolve({status: 'Payment confirmed'})
      });
    })
  }
}

module.exports = StripeController
