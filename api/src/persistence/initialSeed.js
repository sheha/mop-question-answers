const config = require('./../config')

const User= require('./models/user');
const Question = require('./models/question');
const Answer = require('./models/answer');


const seeder = require('mongoose-seeder');
 const data = require('./seedData.json');

 seeder.seed(data, { dropDatabase: false, dropCollections: true })