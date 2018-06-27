'use strict';

// Load express
const express = require('express');
// Load morgan to configure routes
const morgan = require('morgan');
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
// Create a static webserver
app.use(express.static('public'));
// Parse request body
app.use(express.json());
// Log all requests
app.use(requestLogger);
// Use dexter morgan
app.use(morgan('dev'));

app.get('/api/notes', (req, res, next) => {
  const { searchTerm } = req.query;

  notes.filter(searchTerm, (err, list) => {
    if (err) {
      return next(err); // goes to error handler
    }
    res.json(list); // responds with filtered array
  });
});

app.get('/api/notes/:id/', (req, res) => {
  const id = req.params.id;

  notes.find(id, (err, item) => {
    if (err) {
      console.error(err);
    }
    if (item) {
      res.json(item);
    } else {
      console.log('not found');
    }
  });
});

app.get('/boom', (req, res, next) => {
  throw new Error('Boom!!');
});

app.put('/api/notes/:id', (req, res, next) => {
  const id = req.params.id;

  /***** Never trust users - validate input *****/
  const updateObj = {};
  const updateFields = ['title', 'content'];

  updateFields.forEach(field => {
    if (field in req.body) {
      updateObj[field] = req.body[field];
    }
  });

  notes.update(id, updateObj, (err, item) => {
    if (err) {
      return next(err);
    }
    if (item) {
      res.json(item);
    } else {
      next();
    }
  });
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
