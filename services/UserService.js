var EncryptionService = require('./EncryptionService');
var JWTService = require('./JWTService');
var LoginService = require('./LoginService');
var User = require('../models/User');
var ResponseService = require("./ResponseService.js");

var UserService = {

    saveUser(req, res) {
        var encryptedPassword = EncryptionService.encryptText(req.body.password);
        
        var newUser = new User();
        newUser.name = req.body.name;
        newUser.email = req.body.email;
        newUser.password = encryptedPassword;
        
        //Save it into the DB.
        newUser.save((err, user) => {
            if(err) {
                ResponseService.error(res, err);
            }
            else {
                ResponseService.success(res, user, true);
            }
        });
    },

    getUserFromDB(email, password, callback) {
        var encryptedPassword = EncryptionService.encryptText(password);
        User.where({ email, password: encryptedPassword }).findOne(callback);
    },

    getLoggedUserEmail(req) {
        let token = LoginService.getToken(req);
        let user = JWTService.decode(token);
        return user.email;
    }
}

module.exports = UserService;