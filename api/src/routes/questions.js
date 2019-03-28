// src / routes / user.js
'use strict'

// Imports
const express = require('express')
const isEmpty = require('lodash/isEmpty')

// App Imports
const config = require('../config')

let authMiddleware = require('./middlewares/auth')
let Question = require('../persistence/models/question');

// Common Routes
let questionRoutes = express.Router()


questionRoutes.get('/questions/latest/:skip', authMiddleware, (request, response) => {
  let responseData = {
    success: false,
    data: {},
    errors: []
  }

    Question.find({}).sort({ created: -1 }).skip(parseInt(request.params.skip)).exec(function (error, documents) {
      if (documents.length > 0) {
        responseData.data = documents
        responseData.success = true
      }

      response.json(responseData)
    })

})

questionRoutes.get('/questions/hot/:skip', authMiddleware, (request, response) => {
  let responseData = {
    success: false,
    data: {},
    errors: []
  }

    Question.find({}).sort({ likes: -1 }).skip(parseInt(request.params.skip)).exec(function (error, documents) {
      if (documents.length > 0) {
        responseData.data = documents
        responseData.success = true
      }

      response.json(responseData)
    })

})

questionRoutes.post('/questions/add', authMiddleware, (request, response) => {
  let responseData = {
    success: false,
    data: {},
    errors: []
  }

  if (!isEmpty(request.user)) {
    if (request.body.text != '') {
      let question = {
        question: request.body.text,
        userId: request.user._id,
        created: Date.now()
      }

      Question.create(question, (error, document) => {
        if (error) {
          responseData.errors.push({type: 'critical', message: error})
        } else {
          let questionId = document._id

          if (questionId) {
            responseData.data.questionId = questionId
            responseData.success = true
          } else {
            responseData.errors.push({type: 'default', message: 'Please try again.'})
          }
        }

        response.json(responseData)
      })
    } else {
      responseData.errors.push({type: 'warning', message: 'Please enter question.'})

      response.json(responseData)
    }
  } else {
    responseData.errors.push({type: 'critical', message: 'You are not signed in. Please sign in to post a question.'})

    response.json(responseData)
  }
})

questionRoutes.post('/questions/answer', authMiddleware, (request, response) => {
  let responseData = {
    success: false,
    data: {},
    errors: []
  }

  if (!isEmpty(request.user)) {
    if (request.body.text != '') {
      let question = {
        question: request.body.text,
        userId: request.user._id,
        created: Date.now()
      }

      Question.create(question, (error, document) => {
        if (error) {
          responseData.errors.push({type: 'critical', message: error})
        } else {
          let questionId = document._id

          if (questionId) {
            responseData.data.questionId = questionId
            responseData.success = true
          } else {
            responseData.errors.push({type: 'default', message: 'Please try again.'})
          }
        }

        response.json(responseData)
      })
    } else {
      responseData.errors.push({type: 'warning', message: 'Please enter question.'})

      response.json(responseData)
    }
  } else {
    responseData.errors.push({type: 'critical', message: 'You are not signed in. Please sign in to post a question.'})

    response.json(responseData)
  }
})

questionRoutes.get('/questions/:questionId', authMiddleware, (request, response) => {
  let responseData = {
    success: false,
    data: {},
    errors: []
  }

  if (request.params.questionId) {
    Question.find({_id: request.params.questionId}).exec(function (error, documents) {
      if (documents && documents.length > 0) {
        responseData.data = documents[0]
        responseData.success = true
      }

      response.json(responseData)
    })
  } else {
    response.json(responseData)
  }
})

// Export
module.exports = questionRoutes
