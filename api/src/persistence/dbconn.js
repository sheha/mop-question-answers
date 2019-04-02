const  mongoose=require('mongoose'), User=require('./models/user'),
Question=require('./models/question'), Answer=require('./models/answer');//inject models
const config = require('../config/index');
// handles unhandled promise rejection between app and mongod
mongoose.Promise = global.Promise;
// connect / reconnect
const connect =  () => {
    try {
         mongoose.connect(config.DB_URL, { useCreateIndex: true, useNewUrlParser: true });
    } catch (e) {
         mongoose.createConnection(config.DB_URL);
    }
}

module.exports = connect;
