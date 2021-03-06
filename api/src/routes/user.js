// src / routes / user.js
'use strict'

// Imports
const express = require('express')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')

const config = require('./../config')
let authMiddleware = require('./middlewares/auth')
let User = require('../persistence/models/user')


let userRoutes = express.Router();

//get most active users - aggregation on answers
userRoutes.get('/user/all', authMiddleware, (request, response) => {
  let responseData = {
    success: false,
    data: [],
    errors: []
  }

  User.aggregate([{ $unwind: "$answers" },
  { $unwind: "$answers.answer" },
  { $project: {_id: '$_id', user: '$answers.answer'} },
  { $group: {_id: '$user', count: {'$sum': 1} }},
  { $group: {
        _id: null,
        users: {$addToSet: '$_id'},
        occurances: {$push: {'user': '$_id', count: '$count'}}
        }
   }]).exec(function (error, documents) {
     if (documents.length == 0) {
       responseData.data = documents
       responseData.success = true
     }
    if (documents.length >  0) {
      responseData.data = documents
      responseData.success = true
    }
    response.json(responseData)
  });
})

userRoutes.post('/user/info', authMiddleware, (request, response) => {
  let responseData = {
    success: false,
    data: {},
    errors: []
  }
  if (request.body.username) {
    User.findOne({ username: request.body.username }).populate('questions').populate('answers').exec(function (error, documents) {
      if (documents.length >= 0) {
        responseData.data = documents
        responseData.success = true
      }

      response.json(responseData)
    })
  } else {
    responseData.errors.push({ type: 'critical', message: 'Username not provided.' })

    response.json(responseData)
  }
})
  ;

// Login
userRoutes.post('/user/login', authMiddleware, (request, response) => {
  let responseData = {
    success: false,
    data: {},
    errors: []
  }

  if (request.body.username) {
    User.findOne({ username: request.body.username }, (error, document) => {

      if (error) {
        responseData.errors.push({ type: 'critical', message: error })

        response.json(responseData)
      } else {
        if (!document) {
          responseData.errors.push({ type: 'warning', message: 'No user exists with this username.' })

          response.json(responseData)
        } else {
          bcrypt.compare(request.body.password, document.password, function (hashError, hashPasswordCheck) {
            if (!hashError) {
              if (hashPasswordCheck) {
                responseData.data.token = jwt.sign(document._doc, config.secret)
                responseData.success = true
              } else {
                responseData.errors.push({ type: 'critical', message: 'The password is incorrect.' })
              }

              response.json(responseData)
            } else {
              responseData.errors.push({ type: 'critical', message: 'Please try again.' })

              response.json(responseData)
            }
          })
        }
      }
    })
  } else {
    responseData.errors.push({ type: 'critical', message: 'Username not provided.' })

    response.json(responseData)
  }
})

// Register
userRoutes.post('/user/register', (request, response) => {
  let responseData = {
    success: false,
    data: {},
    errors: []
  }

  if (request.body.username != '') {
    // Check user exists
    User.findOne({ username: request.body.username }, (error, document) => {
      if (!document) {
        // User does not exists

        // Hash password
        bcrypt.hash(request.body.password, config.saltRounds, function (hashError, hashPassword) {
          if (!hashError) {
            // Define new user
            let user = {
              username: request.body.username,
              password: hashPassword,
              firstname: request.body.firstname,
              lastname: request.body.lastname,
              email: request.body.email,
              address: request.body.address,
              city: request.body.city,
              country: request.body.country,
              zip:request.body.zip,
              createdAt: new Date()
            }

            // Save into database
            User.create(user, function (errorCreate, documentCreate) {
              let userId = documentCreate._id

              if (userId) {
                responseData.success = true
                responseData.data.userId = userId
              } else {
                responseData.errors.push({ type: 'default', message: 'Please try again.' })
              }

              response.json(responseData)
            })
          } else {
            responseData.errors.push({ type: 'default', message: 'Please try again.' })
          }
        })

      } else {
        // User already exists

        responseData.errors.push({ type: 'warning', message: 'The username is taken. Please choose something else.' })

        response.json(responseData)
      }
    })
  } else {
    responseData.errors.push({ type: 'critical', message: 'Username not provided.' })

    response.json(responseData)
  }
})

// Export
module.exports = userRoutes
