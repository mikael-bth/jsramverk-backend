/* global it describe */

process.env.NODE_ENV = 'test';

const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../../app.js');

chai.should();

chai.use(chaiHttp);

let token;

describe('Docs', () => {
    describe('GET /reset', () => {
        it('201 SUCCESSFUL DB RESET', (done) => {
            chai.request(server)
                .get("/reset")
                .end((err, res) => {
                    res.should.have.status(201);
                    res.body.data.should.include('DB RESET');
                    done();
                });
        });
    });

    describe('GET /docs', () => {
        it('200 SUCCESSFUL REQUEST', (done) => {
            chai.request(server)
                .get("/docs")
                .end((err, res) => {
                    res.should.have.status(200);
                    console.log(res.body);
                    res.body.should.be.an("array").that.is.empty;
                    done();
                });
        });
    });

    describe('POST /register', () => {
        it('201 SUCCESSFUL CREATED USER', (done) => {
            chai.request(server)
                .post("/register")
                .send({username: 'test', password: "test"})
                .end((err, res) => {
                    res.should.have.status(201);
                    res.body.data.should.be.a("string", "Created user");
                    res.body.should.have.property('id');
                    done();
                });
        });
    });

    describe('POST /login', () => {
        it('201 SUCCESSFUL LOGGED IN USER', (done) => {
            chai.request(server)
                .post("/login")
                .send({username: 'test', password: "test"})
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.data.should.be.a("string", "test logged in");
                    res.body.should.have.property('token');
                    token = res.body.token;
                    done();
                });
        });
    });

    describe('POST /create', () => {
        it('201 SUCCESSFUL CREATED DOC', (done) => {
            chai.request(server)
                .post("/create")
                .set("x-access-token", token)
                .send({name: 'test', html: "test"})
                .end((err, res) => {
                    res.should.have.status(201);
                    res.body.data.should.be.a("string", "Created doc");
                    res.body.should.have.property('id');
                    done();
                });
        });
    });

    describe('PUT /update', () => {
        it('201 SUCCESSFUL UPDATED DOC', (done) => {
            chai.request(server)
                .put("/update")
                .send({name: 'test', html: "test1"})
                .end((err, res) => {
                    res.should.have.status(201);
                    res.body.data.should.be.a("string", "Updated: 1");
                    done();
                });
        });
    });

    describe('GET /doc/:name', () => {
        it('200 SUCCESSFUL REQUEST', (done) => {
            chai.request(server)
                .get("/doc/test")
                .set("x-access-token", token)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body[0].name.should.be.a("string", "test");
                    res.body[0].html.should.be.a("string", "test1");
                    res.body[0].should.have.property('_id');
                    done();
                });
        });
    });

    describe('GET BAD ROUTE', () => {
        it('404 UNSUCCESSFUL REQUEST', (done) => {
            chai.request(server)
                .get("/test/badroute")
                .end((err, res) => {
                    res.should.have.status(404);
                    res.body.errors[0].title.should.be.a("string", "Not Found");
                    res.body.errors[0].detail.should.be.a("string", "Not Found");
                    done();
                });
        });
    });

    describe('GET /reset', () => {
        it('201 SUCCESSFUL DB RESET', (done) => {
            chai.request(server)
                .get("/reset")
                .end((err, res) => {
                    res.should.have.status(201);
                    res.body.data.should.include('DB RESET');
                    done();
                });
        });
    });
});
