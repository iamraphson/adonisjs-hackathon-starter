'use strict'



const Route = use('Route');


Route.get('/', 'HomeController.index');
Route.get('/login', 'Auth/AuthController.show');
Route.post('/login', 'Auth/AuthController.postLogin');