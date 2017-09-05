'use strict'
const Env = use('Env')
const paypal = require('paypal-rest-sdk')

class PayPalController {
  constructor () {
    this.PAYPAL_RETURN_URL = `${Env.get('APP_URL')}/api/paypal/success`
    this.PAYPAL_CANCEL_URL = `${Env.get('APP_URL')}/api/paypal/cancel`

    paypal.configure({
      mode: 'sandbox',
      client_id: Env.get('PAYPAL_ID'),
      client_secret: Env.get('PAYPAL_SECRET')
    })
  }

  async index ({request, session, view}) {
    try {
      const paypalResponse = await this.createPaypalPayment('AdonisJS Hackathon Starter', 2, 'USD')
      session.put('paymentId', paypalResponse.paymentId)
      return view.render('api.paypal', { approvalUrl: paypalResponse.approvalUrl })
    } catch (e) {
      console.log('error', e.message)
      return view.render('api.paypal', { approvalUrl: request.originalUrl() })
    }
  }

  async getPayPalSuccess ({request, session, view}) {
    const paymentId = session.get('paymentId')
    const paymentDetails = { payer_id: request.input('PayerID') }
    try {
      await this.getPayPalSuccessDetails(paymentId, paymentDetails)
      return view.render('api.paypal', { result: true, success: true })
    } catch (e) {
      console.log('error', e.message)
      return view.render('api.paypal', { result: true, success: false })
    }
  }

  async getPayPalCancel ({view, session}) {
    session.forget('paymentId')
    return view.render('api.paypal', { result: true, canceled: true })
  }

  getPayPalSuccessDetails(paymentId, paymentDetails){
    return new Promise((resolve, reject) => {
      paypal.payment.execute(paymentId, paymentDetails, (err) => {
        if (err) {
          return reject(err)
        }
        return resolve({success: true})
      })
    })
  }

  getPaymentDetails(description, amount, currency) {
    return {
      intent: 'sale',
      payer: {
        payment_method: 'paypal'
      },
      redirect_urls: {
        return_url: this.PAYPAL_RETURN_URL,
        cancel_url: this.PAYPAL_CANCEL_URL
      },
      transactions: [{
        description: description,
        amount: {
          currency: currency,
          total: amount
        }
      }]
    }
  }

  createPaypalPayment (description, amount, currency) {
    return new Promise((resolve, reject) => {
      paypal.payment.create(this.getPaymentDetails(description, amount, currency), (err, payment) => {
        if (err) {
          return reject(err)
        }
        const links = payment.links
        for (let i = 0; i < links.length; i++) {
          if (links[i].rel === 'approval_url') {
            return resolve({
              approvalUrl: links[i].href,
              paymentId: payment.id
            })
          }
        }
      })
    })
  }
}

module.exports = PayPalController
