'use strict';

// Load/Require Express
const express = require('express');
// Create a Router
const router = express.Router();
// Load array of notes
const data = require('./../db/notes');
// Simple In-Memory Database
const simDB = require('./../db/simDB');
const notes = simDB.initialize(data); 

// GET list of all notes
router.get('/notes', (req, res, next) => {
  const { searchTerm } = req.query;

  notes.filter(searchTerm, (err, list) => {
    if (err) {
      return next(err); // goes to error handler
    }
    res.json(list); // responds with filtered array
  });
});

// GET one note by id
router.get('/notes/:id', (req, res) => {
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

// GET BOOM!
router.get('/boom', (req, res, next) => {
  let err = new Error('I\'m a teapot');
  err.status = 418;
  res.status(418).json({ message: 'I\'m a teapot'});
  throw new Error('Boom!!');
});

// PUT to update an item
router.put('/notes/:id', (req, res, next) => {
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

// Post (insert) an item
router.post('/notes', (req, res, next) => {
  const { title, content } = req.body;
  const newItem = { title, content };
  // Validate user input
  if (!newItem.title) {
    const err = new Error('Missing `title` in request body');
    err.status = 400;
    return next(err);
  }
  // Create new note
  notes.create(newItem, (err, item) => {
    if (err) {
      return next(err);
    }
    if (item) {
      res.location(`http://${req.headers.host}/notes/${item.id}`).status(201).json(item);
    } else {
      next();
    }
  });
});

module.exports = router;