var Firebase = require('./Firebase');
var LoginService = require('./services/LoginService');
var User = require('./models/User');
var UserService = require('./services/UserService');
var ContactsService = require('./services/ContactsService');

var Router = {

    getUserRouter(express) {
        var router = express.Router();

        router.use( (req, res, next) => {
            next();
        });

        router.get('/',  (req, res) => {
            // TODO REMOVE ACTION
            UserService.getAllUsers(req, res);
        });

        router.route('/register')
            .post( (req, res) => {
                UserService.saveUser(req, res);
            });

        return router;
    },

    getLoginRouter(express) {
        var router = express.Router();

        router.use((req, res, next) => {
            next();
        });

        router.post('/', (req, res) => {
            LoginService.login(req, res);
        });

        return router;
    },

    getApiRouter(express, firebaseRef) {
        var router = express.Router();

        router.use((req, res, next) => {
            // Let's check if user is logged in
            var isValid = LoginService.validateLogin(req, res);
            if(isValid){
                next();
            }
        });

        router.route('/contact')
            .post(function (req, res) {
                ContactsService.createContact(req, res, firebaseRef);
            });

        return router;

    }
}

module.exports = Router;