'use strict';
process.env.NODE_ENV = 'test';
// Require the app
const app = require('../server');
// Require Chai Assertions Library
const chai = require ('chai');
// Require Chai-http to test http requests
const chaiHttp = require('chai-http');
// Initialize expect
const expect = chai.expect;
// Let's use chaiHttp
chai.use(chaiHttp);
// Test blocks
describe('Reality check', function() {
  it('true should be true', function() {
    expect(true).to.be.true;
  });
  it('2 + 2 should equal 4', function() {
    expect(2 + 2).to.equal(4);
  });
});
describe('Express static', function() {
  it('GET request "/" should return the index page', function() {
    return chai.request(app)
      .get('/')
      .then(function(res) {
        expect(res).to.exist;
        expect(res).to.have.status(200);
        expect(res).to.be.html;
      });
  });
});
describe('404 handler', function() {
  it('should respond with 404 when given a bad path', function() {
    return chai.request(app)
      .get('/DOES/NOT/EXIST')
      .then(res => {
        expect(res).to.have.status(404);
      });
  });
});
describe('GET /api/notes', function() {
  it('should return the default of 10 Notes as an array', function() {
    return chai.request(app)
      .get('/api/notes')
      .then(res => {
        expect(res.body).to.have.length(10);
      });
  });
  it('should return an array of objects with the id, title and content', function() {
    return chai.request(app)
      .get('/api/notes')
      .then(res => {
        res.body.forEach(item => {
          expect(item).to.include.keys('id','title','content');
        });
      });
  });
  it('should return correct search results for a valid query', function() {
    return chai.request(app)
      .get('/api/notes?searchTerm=the')
      .then(res => {
        expect(res.body).to.have.length(2);
      });
  });
  it('should return an empty array for an incorrect query', function() {
    return chai.request(app)
      .get('/api/notes?searchTerm=HomerJSimpson')
      .then(res => {
        expect(res.body).to.have.length(0);
      });
  });
});
describe('GET /api/notes/:id', function () {
  it('should return correct note object with id, title and content for a given id', function() {
    return chai.request(app)
      .get('/api/notes/1005')
      .then(res => {
        expect(res.body).to.include.keys('id','title','content');
        expect(res.body.id).to.equal(1005);
      });
  });
  it('should respond with a 404 for an invalid id', function() {
    return chai.request(app)
      .get('/api/notes/DOESNOTEXIST')
      .then(res => {
        expect(res).to.have.status(404);
      });
  });
});
describe('POST /api/notes', function () {
  it('should create and return a new item with location header when provided valid data', function() {
    const data = { 'title': 'Evil Homer', 'content': 'I am Evil Homer' };
    return chai.request(app)
      .post('/api/notes')
      .send(data)
      .then(res => {
        expect(res.body).to.include.keys('id','title','content');
        expect(res.header.location).to.exist;
      });
  });
  it('should return an object with a message property "Missing title in request body" when missing "title" field', function() {
    const data = { 'content': 'I am Evil Homer' };
    return chai.request(app)
      .post('/api/notes')
      .send(data)
      .then(res => {
        expect(res.body.message).to.equal('Missing `title` in request body');
      });
  });
});
describe('PUT /api/notes/:id', function () {
  it('should update and return a note object when given valid data', function () {
    const data = { 'title': 'Evil Homer', 'content': 'I am Evil Homer' };
    return chai.request(app)
      .put('/api/notes/1006')
      .send(data)
      .then(res => {
        expect(res.body).to.be.a('object');
        expect(res.body).to.include.keys('id', 'title', 'content');
      });
  });
  it('should respond with a 404 for an invalid id', function () {
    const data = { 'title': 'Evil Homer', 'content': 'I am Evil Homer' };
    return chai.request(app)
      .put('/api/notes/DOESNOTEXIST')
      .send(data)
      .then(res => {
        expect(res).to.have.status(404);
      });
  });
  it('should return an object with a message property "Missing title in request body" when missing "title" field', function() {
    const data = { 'content': 'I am Evil Homer' };
    return chai.request(app)
      .put('/api/notes/1006')
      .send(data)
      .then(res => {
        expect(res.body.message).to.equal('Missing `title` in request body');
      });
  });
});
describe('DELETE /api/notes/:id', function () {
  it('should delete an item by id', function () {
    return chai.request(app)
      .delete('/api/notes/1007')
      .then(res => {
        expect(res.body).to.be.empty;
      });
  });
});
