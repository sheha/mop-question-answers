const  mongoose=require('mongoose');
const config = require('../config/index');

// connect / reconnect
const connect = async () => {
    try {
        await mongoose.connect(environment.DB_URL, { useCreateIndex: true, useNewUrlParser: true });
        console.log('Database connection established!')
    } catch (e) {
        await mongoose.createConnection(environment.DB_URL);
    }
}

export default connect;