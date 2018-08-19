// This will setup my server so the communication with my REST api should work smoothly
var bodyParser = require('body-parser');
var Database = require('./Database');
var express = require('express');
var Router = require('./Router');

var app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var db = Database.getConnection();
db.on('error', Database.handleError());
db.once('open', () => {
    var userRouter = Router.getUserRouter(express);
    var loginRouter = Router.getLoginRouter(express);
    var apiRouter = Router.getApiRouter(express);
        
    // Possible routes on this API
    app.use('/user', userRouter);
    app.use('/login', loginRouter);
    app.use('/api', apiRouter);
    
    // Add port and start server (default 8080)
    var port = process.env.PORT || 8080; 
    app.listen(port);
});
