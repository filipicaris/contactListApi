let mongoose = require("mongoose");
let chai = require('chai');
let chaiHttp = require('chai-http');

//During the test the env variable is set to test
process.env.NODE_ENV = 'test';

let should = chai.should();
chai.use(chaiHttp);

let server = require('../server');
let User = require('../models/User');

let userA = {
    name: "Filipi Caris dos Santos",
    email: "filipi.caris@me.com",
    password: "mudar123"
}
let userB = {
    name: "Filipi Caris dos Santos",
    email: "filipi.caris@gmail.com",
    password: "mudar1234"
}

describe('Login', () => {
    before((done) => {
        //Before each test we empty the database
        User.deleteMany({}, (err) => {
            done();
        });
    });
    describe('/POST login with wrong user', () => {
        it('it should register user A', (done) => {
            chai.request(server)
                .post('/user/register')
                .send({
                    name: "Filipi Caris dos Santos",
                    email: "filipi.caris@me.com",
                    password: "mudar123"
                })
                .end((err, res) => {
                    res.should.have.status(200);
                    done()
                });
        });
        it('it should log in with user A', (done) => {
            chai.request(server)
                .post('/login')
                .send({
                    email: userA.email,
                    password: userA.password
                })
                .end((err, res) => {
                    res.should.have.status(200);
                    done();
                });
        });
        it('it should failt to log in with user B', (done) => {
            chai.request(server)
                .post('/login')
                .send({
                    email: userB.email,
                    password: userB.password
                })
                .end((err, res) => {
                    res.should.have.status(401);
                    done();
                });
        });
    });
})