// src / server.js
'use strict'

// Imports
const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')

const logRequests = require('./routes/middlewares/logRequests');
const dbconn = require('./persistence/dbconn')
const config = require('./config')
let commonRoutes = require('./routes')
let userRoutes = require('./routes/user')
let tweetRoutes = require('./routes/questions')

// Setup
let apiServer = express()
apiServer.set('APP_SECRET', config.secret)

// MongoDB (mongoose)
dbconn();

// Enable CORS
// apiServer.use(cors())
apiServer.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

logRequests(apiServer);


// Body Parser
apiServer.use(bodyParser.urlencoded({extended: true}))
apiServer.use(bodyParser.json())

// Cookie Parser
apiServer.use(cookieParser())

// Routes
apiServer.use(commonRoutes)
apiServer.use(userRoutes)
//apiServer.use(tweetRoutes)

//provide stack trace with errors
apiServer.use((err, req, res, next) => {
    res.status(err.status || 500).json({
        error: {
            message: err.message,
            err: err.stack
        },
    });
    next(err);
});

// Export
module.exports = apiServer
