var jwt = require('jsonwebtoken')

var JWTService = {
    SECRET: "FILIPICARIS", //secret used to create jwt

    options: {
        expiresIn: '1h', // jwt will expire by default in 1 hour
        algorithm: 'HS256' //using default
    },

    sign(user) {
        return jwt.sign(user, this.SECRET);
    },

    verify(token, errCallback) {
        try {
            return jwt.verify(token, this.SECRET)
        } catch (err) {
            errCallback(err)
        }
    },

    decode(token) {
        return jwt.decode(token);
    }
}

module.exports = JWTService;