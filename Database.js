var mongoose = require('mongoose');

var Database = {
    server: 'localhost:27017',
    name: 'database',
    options: {
        socketTimeoutMS: 30000,
        keepAlive: true,
        reconnectTries: 30000,
        useNewUrlParser: true,
        user: 'admin', pass:'pass'
    },
    
    getDatabase() {
        mongoose.connect(`mongodb://${server}/${name}`, options)
        return mongoose.connection;
    },

    handleError() {
        console.error.bind(console, 'Connection Error:')
    }
}

module.exports = Database;