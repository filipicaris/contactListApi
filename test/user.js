let mongoose = require("mongoose");
let chai = require('chai');
let chaiHttp = require('chai-http');

//During the test the env variable is set to test
process.env.NODE_ENV = 'test';

let should = chai.should();
chai.use(chaiHttp);

let server = require('../server');
let User = require('../models/User');

describe('Users', () => {
    beforeEach((done) => { 
        User.find({}, (err, users) => {
            console.log(`Users before deletion = ${users.length}`)
            done();
        });
    });
    beforeEach((done) => { 
        //Before each test we empty the database
        User.deleteMany({}, (err) => {
            done();
        });
    });
    beforeEach((done) => { 
        User.find({}, (err, users) => {
            console.log(`Users after deletion = ${users.length}`)
            done();
        });
    });
    // describe('/POST user', () => {
    //     it('it should register one user', (done) => {
    //         chai.request(server)
    //             .post('/user/register')
    //             .send({
    //                 name: "Filipi Caris dos Santos",
    //                 email: "filipi.caris@me.com",
    //                 password: "mudar123"
    //             })
    //             .end((err, res) => {
    //                 res.should.have.status(200);
    //                 done();
    //             });
    //     });
    // });
})

