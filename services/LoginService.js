var UserService = require('./UserService')
var EncryptionService = require('./EncryptionService')
var JWTService = require('./JWTService')

var LoginService = {
    login(req, res) {
        contact.email = req.body.email;
        contact.password = req.body.password;
        let user = UserService.getUserFromDB(email, password);
        if (!user) {
            this.error(user)
        } else {
            JWTService.sign(user);
        }
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

    error(res, user) {
        //TODO
    },

    validateLogin(req, res) {
        var token = this.getToken(req);
        var user = JWTService.verify(token, (err) => {
            this.error(res, err);
        });
        return user;
    }
}

module.exports = LoginService;