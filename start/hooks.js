'use strict'

const { ioc } = require('@adonisjs/fold')
const { hooks } = require('@adonisjs/ignitor')
const bitbucket = use('App/Extensions/Bitbucket')

hooks.before.providersRegistered(() => {
  ioc.extend('Adonis/Addons/Ally', 'bitbucket', function () {
    return bitbucket
  })
})
