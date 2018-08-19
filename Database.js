var mongoose = require('mongoose');

var Database = {
    options: {
        socketTimeoutMS: 30000,
        keepAlive: true,
        reconnectTries: 30000,
        useNewUrlParser: true,
        user: 'admin', pass:'pass',
    },
    
    getDatabaseConnection(dbhostURL) {
        mongoose.connect(dbhostURL, this.options);
        return mongoose.connection;
    },

    handleError() {
        console.error.bind(console, 'Connection Error:')
    }
}

module.exports = Database;