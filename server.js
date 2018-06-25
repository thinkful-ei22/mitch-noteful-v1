'use strict';

// Load express
const express = require('express');
// Load array of notes
const data = require('./db/notes');
// Initialize express app
const app = express();

app.use(express.static('public'));

app.listen(8080, function () {
  console.info(`Server listening on ${this.address().port}`);
}).on('error', err => {
  console.error(err);
});

console.log('Hello Noteful!');

// INSERT EXPRESS APP CODE HERE...
