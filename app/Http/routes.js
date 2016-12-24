'use strict'



const Route = use('Route');


Route.get('/', 'HomeController.index');
Route.get('/login', 'Auth/AuthController.showLogin');
Route.post('/login', 'Auth/AuthController.postLogin');
Route.get('/logout', 'Auth/AuthController.logout');
Route.get('/register', 'Auth/AuthController.getRegister');
Route.post('/register', 'Auth/AuthController.postRegister');

Route.get('/password/reset', 'Auth/PasswordController.showResetForm');
Route.post('/password/email', 'Auth/PasswordController.sendResetLinkEmail');
Route.get('/password/token/reset/:token' , 'Auth/PasswordController.showResetView');
Route.post('/password/reset', 'Auth/PasswordController.reset');


Route.group('authenticated', function () {
    Route.get('/account', 'AccountController.edit');
    Route.post('/account/profile', 'AccountController.update');
    Route.post('/account/password', 'AccountController.changePassword');
    Route.post('/account/photo', 'AccountController.uploadAvatar');
}).middleware('auth');
