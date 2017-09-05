'use strict'

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URL's and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/guides/routing
|
*/

const Route = use('Route')

Route.get('/', 'HomeController.index').as('welcomePage')

Route.get('/login', 'Auth/AuthController.showLogin').as('loginPage')
Route.post('/login', 'Auth/AuthController.postLogin').as('login.store')
Route.get('/logout', 'Auth/AuthController.logout').as('logout')

Route.get('/register', 'Auth/AuthController.showRegister').as('registerPage')
Route.post('/register', 'Auth/AuthController.postRegister').as('register.store')

Route.get('/password/reset', 'Auth/PasswordController.showResetForm').as('reset.form')
Route.post('/password/email', 'Auth/PasswordController.sendResetLinkEmail').as('send.reset.email')
Route.get('/password/token/reset/:token', 'Auth/PasswordController.showResetView')
Route.post('/password/reset', 'Auth/PasswordController.reset').as('reset.password')

Route.get('/contact', 'ContactController.index').as('contact.show')
Route.post('/contact', 'ContactController.sendMessage').as('contact.send')

/**
 * Social Login Route
 */
Route.get('/auth/:provider', 'Auth/AuthController.redirectToProvider').as('social.login')
Route.get('/auth/:provider/callback', 'Auth/AuthController.handleProviderCallback').as('social.login.callback')

Route.group(() => {
  Route.get('/account', 'AccountController.edit').as('user.account')
  Route.post('/account/profile', 'AccountController.update').as('account.update')
  Route.post('/account/photo', 'AccountController.uploadAvatar').as('account.updateAvatar')
  Route.post('/account/password', 'AccountController.changePassword').as('account.updatePwd')
  Route.get('/account/unlink/:provider', 'AccountController.unlinkSocialMediaAccount').as('unlink.sm')
  Route.get('/account/delete', 'AccountController.destroy').as('account.delete')

  Route.get('/api/github', 'GithubController.index').as('api.github')
  Route.get('/api/twitter', 'TwitterController.index').as('api.twitter')
  Route.post('/api/twitter/send', 'TwitterController.sendTweet').as('api.twitter.send')
  Route.get('/api/facebook', 'FacebookController.index').as('api.facebook')
  Route.get('/api/foursquare', 'FoursquareController.index').as('api.foursquare')
  Route.get('/api/instagram', 'InstagramController.index').as('api.instagram')
  Route.get('/api/lastfm', 'LastFmController.index').as('api.lastfm')
  Route.get('/api/linkedin', 'LinkedinController.index').as('api.linkedin')
  Route.get('/api/nyt', 'NewYorkTimeController.index').as('api.nyt')
  Route.get('/api/stripe', 'StripeController.index').as('api.stripe')
  Route.post('/api/stripe', 'StripeController.postStripe').as('api.stripe.post')
  Route.get('/api/paypal', 'PayPalController.index').as('api.paypal')
  Route.get('/api/paypal/success', 'PayPalController.getPayPalSuccess').as('api.paypal.success')
  Route.get('/api/paypal/cancel', 'PayPalController.getPayPalCancel').as('api.paypal.cancel')
  Route.get('/api/tumblr', 'TumblrController.index').as('api.tumblr')
  Route.get('/api/scraping', 'ScarpingController.index').as('api.scraping')
  Route.get('/api/yahoo', 'YahooController.index').as('api.yahoo')
  Route.get('/api/clockwork', 'ClockworkController.index').as('api.clockwork')
  Route.post('/api/clockwork', 'ClockworkController.postClockwork').as('api.clockwork.post')
  Route.get('/api/lob', 'LobController.index').as('api.lob')
  Route.get('/api/slack', 'SlackController.index').as('api.slack')
  Route.post('/api/slack', 'SlackController.sendMessage').as('api.slack.send')
  Route.get('/api/upload', 'UploadController.index').as('api.upload')
  Route.post('/api/upload/apply', 'UploadController.upload').as('api.uploadfile')
  Route.get('/api/google-maps', 'GoogleMapController.index').as('api.googlemap')
})

Route.get('/api', async ({ view }) => view.render('api'))
