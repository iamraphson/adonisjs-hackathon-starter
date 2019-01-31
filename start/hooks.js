
const { ioc } = require('@adonisjs/fold')
const { hooks } = require('@adonisjs/ignitor')

const { bitbucket } = require('allyproviders')

hooks.before.providersRegistered(() => {
  ioc.extend('Adonis/Addons/Ally', 'bitbucket', () => bitbucket)
})
