var Firebase = require('./Firebase')
var LoginService = require('./services/LoginService')
var User = require('./models/User');
var UserService = require('./UserService')

var Router = {

    getUserRouter() {
        var router = express.Router();

        router.use(function (req, res, next) {
            console.log('The User Router was called');
            next();
        });

        router.get('/', function (req, res) {
            console.log("'/'was called, but there's no API for this entrypoint");
        });

        router.route('/register')
            .post(function (req, res) {
                UserService.saveUser(req, res);
            })
    },

    getLoginRouter() {
        var router = express.Router();

        router.use(function (req, res, next) {
            console.log('The Login Router was called');
            next();
        });

        router.get('/', function (req, res) {
            LoginService.login(req, res);
        });
    },

    getApiRouter() {
        var router = express.Router();

        router.use(function (req, res, next) {
            // Let's check if user is logged in
            LoginService.validateLogin(req, res);
            next();
        });

        router.route('/contact')
            .post(function (req, res) {
                var firebaseRef = Firebase.getFirebaseRef();
                ContactsService.createContact(req, res, firebaseRef);
            });

    }
}

module.exports = Router;