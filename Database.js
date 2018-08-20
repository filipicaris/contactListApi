var mongoose = require('mongoose');
var config = require('config');

var Database = {
    options: {
        socketTimeoutMS: 30000,
        keepAlive: true,
        reconnectTries: 30000,
        useNewUrlParser: true,
        user: config.DBUser,
        pass: config.DBPass
    },
    
    getDatabaseConnection() {
        mongoose.connect(config.DBHost, this.options);
        return mongoose.connection;
    },

    handleError(err) {
        console.log(err);
    }
}

module.exports = Database;