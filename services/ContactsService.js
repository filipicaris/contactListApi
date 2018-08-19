var Contact = require("../models/Contact.js")
var JWTService = require("./JWTService.js")
var LoginService = require("./LoginService.js")

var ContactsService = {
    createContact(req, res, firebaseRef) {
        let { name, email, phone } = req.body;
        let userEmail = JWTService.decode(LoginService.getToken(req)).email;

        let contact = Contact.new(name, email, phone, userEmail)

        var contactsRef = firebaseRef.child("contacts");
        contactsRef.set(contact)
            .then(() => {
                res.json(contact)
            })
            .catch((err) => {
                this.error(res, err)
            });
    },

    error(res, err) {
        res.send(err)
    }
}

module.exports = ContactsService;