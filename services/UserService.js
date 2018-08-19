var EncryptionService = require('./EncryptionService')
var JWTService = require('./JWTService')
var LoginService = require('./LoginService')
var User = require('../models/User')

var UserService = {

    getUserFromDB(email, password) {
        var encryptedPassword = EncryptionService.encryptText(password);
        let user = await User.findOne({ email, password: encryptedPassword })
        return user;
    },

    getLoggedUserEmail(req) {
        let token = LoginService.getToken(req);
        let user = JWTService.decode(token);
        return user.email;
    }
}

module.exports = UserService;