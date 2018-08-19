var jwt = require('jsonwebtoken');
var ResponseService = require("./ResponseService.js");

var JWTService = {
    SECRET: "Fi%li%pi%Ca%ri%s@STRV", //secret used to create jwt

    options: {
        expiresIn: '1h', // jwt will expire by default in 1 hour
        algorithm: 'HS256' //using default
    },

    sign(res, user) {
        var payload = {
            name: user.name,
            email: user.email,
            password: user.password
        }
        var token = jwt.sign(payload, this.SECRET, this.options);
        ResponseService.success(res, {
            auth: true,
            token: token
        }, true);
    },

    verify(res, token) {
        try {
            return jwt.verify(token, this.SECRET);
        } catch (err) {
            ResponseService.error(res,err);
        }
    },

    decode(token) {
        return jwt.decode(token);
    }
}

module.exports = JWTService;