var UserService = require('./UserService');
var EncryptionService = require('./EncryptionService');
var JWTService = require('./JWTService');
var ResponseService = require("./ResponseService.js");

var LoginService = {
    login(req, res) {
        let {email, password} = req.body;
        UserService.getUserFromDB(email, password, (err, user) => {
            if (err) {
                ResponseService.error(res, err);
            } if(!user){
                ResponseService.unauthorized(res, "User not found");
            } else {
                JWTService.sign(res, user);
            }
        });
    },

    getToken(req) {
        if (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') {
            return req.headers.authorization.split(' ')[1];
        } else if (req.query && req.query.token) {
            return req.query.token;
        } else if (req.cookies && req.cookies.token) {
            return req.cookies.token;
        }
    },

    validateLogin(req, res) {
        var token = this.getToken(req);
        var user = JWTService.verify(res, token);
        return user != null;
    }
}

module.exports = LoginService;