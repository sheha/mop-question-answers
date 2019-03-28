// this file is a way of accessing env variables from .env throughout the app
// reads process.env vars and assigns them, or their defaults
'use strict'

require('dotenv').config();

const config = {
  DB_URL: process.env.MONGOLAB_URI || process.env.MONGOHQ_URL || 'mongodb://localhost/mop-qa-db' ,
  port: 5001,
  secret: 'super-secret-key',
  databaseUrl: 'mongodb://localhost/mop-qa-db',
  saltRounds: 10
}

module.exports = config
