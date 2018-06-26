'use strict';

// Load express
const express = require('express');
// Load array of notes
const data = require('./db/notes');
// Simple In-Memory Database
const simDB = require('./db/simDB');  // <<== add this
const notes = simDB.initialize(data); // <<== and this
// Initialize express app
const app = express();
// Require config.js and create a variable for PORT using object descructuring
const { PORT } = require('./config');
const { requestLogger } = require('./middleware/logger');


app.use(express.static('public'));
app.use(requestLogger);

app.get('/api/notes', (req, res) => {
  const { searchTerm } = req.query;
  res.json(searchTerm ? data.filter(item => item.title.includes(searchTerm)) : data);
});

app.get('/api/notes/:id/', (req, res) => {
  const id = req.params.id;
  res.json(data.find(note => note.id === Number(id)));
});

app.get('/boom', (req, res, next) => {
  throw new Error('Boom!!');
});

app.use(function (req, res, next) {
  let err = new Error('Not Found');
  err.status = 404;
  res.status(404).json({ message: 'Not Found' });
});

app.use(function (err, req, res, next) {
  res.status(err.status || 500);
  res.json({
    message: err.message,
    error: err
  });
});

app.listen(PORT, function () {
  console.info(`Server listening on ${this.address().port}`);
}).on('error', err => {
  console.error(err);
});

console.log('Hello Noteful!');

// INSERT EXPRESS APP CODE HERE...
