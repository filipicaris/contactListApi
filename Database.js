var mongoose = require('mongoose');

var Database = {
    options: {
        socketTimeoutMS: 30000,
        keepAlive: true,
        reconnectTries: 30000,
        useNewUrlParser: true
    },
    
    getDatabaseConnection(dbhostURL) {
        mongoose.connect(dbhostURL, this.options);
        return mongoose.connection;
    },

    handleError(err) {
        console.error.bind(console, 'Connection Error:')
    }
}

module.exports = Database;