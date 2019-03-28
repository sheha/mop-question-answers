const  mongoose=require('mongoose');
const config = require('../config/index');
// handles unhandled promise rejection between app and mongod
mongoose.Promise = global.Promise;
// connect / reconnect
const connect = async () => {
    try {
        await mongoose.connect(config.DB_URL, { useCreateIndex: true, useNewUrlParser: true });
        console.log('Database connection established!')
    } catch (e) {
        await mongoose.createConnection(config.DB_URL);
    }
}

module.exports = connect;
