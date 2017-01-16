'use strict'

const Route = use('Route')

Route.get('/', 'HomeController.index')
Route.get('/login', 'Auth/AuthController.showLogin')
Route.post('/login', 'Auth/AuthController.postLogin')
Route.get('/logout', 'Auth/AuthController.logout')
Route.get('/register', 'Auth/AuthController.getRegister')
Route.post('/register', 'Auth/AuthController.postRegister')

Route.get('/password/reset', 'Auth/PasswordController.showResetForm')
Route.post('/password/email', 'Auth/PasswordController.sendResetLinkEmail')
Route.get('/password/token/reset/:token', 'Auth/PasswordController.showResetView')
Route.post('/password/reset', 'Auth/PasswordController.reset')

/**
 * Social Login Route
 */
Route.get('/auth/:provider', 'Auth/AuthController.redirectToProvider')
Route.get('/auth/:provider/callback', 'Auth/AuthController.handleProviderCallback')


Route.group('authenticated', function () {
  Route.get('/account', 'AccountController.edit')
  Route.post('/account/profile', 'AccountController.update')
  Route.post('/account/password', 'AccountController.changePassword')
  Route.post('/account/photo', 'AccountController.uploadAvatar')
  Route.get('/account/delete', 'AccountController.destroy')

  Route.get('/api/github', 'GithubController.index')
  Route.get('/api/twitter', 'TwitterController.index')
  Route.post('/newtweet/send', 'TwitterController.sendTweet')
  Route.get('/api/facebook', 'FacebookController.index')
  Route.get('/api/foursquare', 'FacebookController.index')
}).middleware('auth')

Route.get('/api', function * (request, response) {
  yield response.sendView('apiPage')
});