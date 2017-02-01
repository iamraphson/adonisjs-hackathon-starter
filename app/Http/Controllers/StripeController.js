/**
 * Created by Raphson on 2/1/17.
 */
'use strict'
const Env = use('Env')
const stripe = require('stripe')(Env.get('STRIPE_ID'));

class StripeController {

	* index (request, response) {
		yield response.sendView('api.stripeApi', { publishableKey: Env.get('STRIPE_ID')})
	}

	* postStripe(request, response) {
		const stripeData = request.only('stripeToken', 'stripeEmail')
		try {
			yield this.sendStripeData(stripeData);
			yield request.with({ status: 'Your card has been successfully charged.' }).flash()
			response.redirect('back')
		} catch(e){
			console.log(e.message);
			yield request.with({error: 'Your card has been declined.'}).flash()
			response.redirect('back')
		}
  }

	sendStripeData(stripeData) {
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
