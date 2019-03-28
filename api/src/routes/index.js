'use strict'

const express = require('express')

let authMiddleware = require('./middlewares/auth')


let commonRoutes = express.Router()

// Root
commonRoutes.get('/', authMiddleware, (request, response) => {
  let responseData = {
    success: false,

    errors: {}
  }

  response.json(responseData)
})

// Export
module.exports = commonRoutes
