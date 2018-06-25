'use strict';

// Load express
const express = require('express');
// Load array of notes
const data = require('./db/notes');
// Initialize express app
const app = express();

app.use(express.static('public'));

app.get('/api/notes', (req, res) => {
  const { searchTerm } = req.query;
  res.json(searchTerm ? data.filter(item => item.title.includes(searchTerm)) : data);
});

app.get('/api/notes/:id', (req, res) => {
  const id = req.params.id;
  res.json(data.find(note => note.id === Number(id)));
});

app.listen(8080, function () {
  console.info(`Server listening on ${this.address().port}`);
}).on('error', err => {
  console.error(err);
});

console.log('Hello Noteful!');

// INSERT EXPRESS APP CODE HERE...
