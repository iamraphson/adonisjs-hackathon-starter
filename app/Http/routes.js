'use strict'



const Route = use('Route');


Route.get('/', 'HomeController.index');
Route.get('/login', 'Auth/AuthController.showLogin');
Route.post('/login', 'Auth/AuthController.postLogin');
Route.get('/logout', 'Auth/AuthController.logout');
Route.get('/register', 'Auth/AuthController.getRegister');
Route.post('/register', 'Auth/AuthController.postRegister');


