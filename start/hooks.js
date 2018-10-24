'use strict'

const { ioc } = require('@adonisjs/fold')
const { hooks } = require('@adonisjs/ignitor')

hooks.before.providersRegistered(() => {
  ioc.extend('Adonis/Addons/Ally', 'bitbucket', function () {
    return require('../app/Extensions/Bitbucket')
  })
})
