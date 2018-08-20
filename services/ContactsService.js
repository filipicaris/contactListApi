var Contact = require("../models/Contact.js");
var JWTService = require("./JWTService.js");
var ResponseService = require("./ResponseService.js");
var LoginService = require("./LoginService.js");
var EncryptionService = require("./EncryptionService.js");
var Firebase = require("../Firebase.js");
var config = require('config');

var ContactsService = {

    createContact(req, res) {
        let {
            name,
            email,
            phone
        } = req.body;
        try {
            let contact = Contact.new(name, email, phone);

            var contactsReference = Firebase.getDatabase().ref(config.FirebaseReferencePath);
            var newContactKey = contactsReference.child("contacts").push().key;

            let jwtPayload = JWTService.decode(LoginService.getToken(req));
            let emailAsMD5 = EncryptionService.createHashMD5(jwtPayload.email);

            var updates = {};
            updates['/user-contacts/' + emailAsMD5 + '/' + newContactKey] = contact;

            contactsReference
                .update(updates)
                .then(() => {
                    contact._id = newContactKey;
                    ResponseService.success(res, contact, true);
                })
                .catch(err => {
                    ResponseService.error(res, err);
                });
        } catch (err) {
            ResponseService.error(res, err);
        }
    }
}

module.exports = ContactsService;