let mongoose = require("mongoose");
let chai = require('chai');
let chaiHttp = require('chai-http');

//During the test the env variable is set to test
process.env.NODE_ENV = 'test';

let should = chai.should();
chai.use(chaiHttp);

let server = require('../server');
let User = require('../models/User');

let user = {
    name: "Filipi Caris dos Santos",
    email: "filipi.caris@me.com",
    password: "mudar123"
}

let contactComplete = {
    name: "Filipi Caris dos Santos",
    email: "filipi.caris@me.com",
    phone: "+5511912345678"
}
let contactNoEmail = {
    name: "Filipi Caris dos Santos",
    phone: "+5511912345678"
}
let contactNoName = {
    email: "filipi.caris@me.com",
    phone: "+5511912345678"
}
let contactNoPhone = {
    name: "Filipi Caris dos Santos",
    email: "filipi.caris@me.com"
}

let tokenUserA;

describe('Contacts', () => {
    before((done) => {
        //Before each test we empty the database
        User.deleteMany({}, (err) => {
            done();
        });
    });
    describe('/POST Tests on creating contacts', () => {
        it('register new user', (done) => {
            chai.request(server)
                .post('/user/register')
                .send(user)
                .end((err, res) => {
                    res.should.have.status(200);
                    done()
                });
        });
        it('login with user', (done) => {
            chai.request(server)
                .post('/login')
                .send({
                    email: user.email,
                    password: user.password
                })
                .end((err, res) => {
                    res.should.have.status(200);
                    tokenUserA = res.body.token;
                    done();
                });
        });
        it('Create Contact Complete', (done) => {
            chai.request(server)
                .post('/api/contact')
                .send(contactComplete)
                .set('Authorization', 'Bearer ' + tokenUserA)
                .end((err, res) => {
                    res.should.have.status(200);
                    done();
                });
        });
        it('it should fail on creating contact without name', (done) => {
            chai.request(server)
                .post('/api/contact')
                .send(contactNoName)
                .set('Authorization', 'Bearer ' + tokenUserA)
                .end((err, res) => {
                    res.should.have.status(500);
                    done();
                });
        });
        it('it should fail on creating contact without email', (done) => {
            chai.request(server)
                .post('/api/contact')
                .send(contactNoEmail)
                .set('Authorization', 'Bearer ' + tokenUserA)
                .end((err, res) => {
                    res.should.have.status(500);
                    done();
                });
        });
        it('it should fail on creating contact without phone', (done) => {
            chai.request(server)
                .post('/api/contact')
                .send(contactNoPhone)
                .set('Authorization', 'Bearer ' + tokenUserA)
                .end((err, res) => {
                    res.should.have.status(500);
                    done();
                });
        });
    });
})