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
  // Filter a list of notes
  notes.filter(searchTerm) 
    .then(list => {
      if (list) {
        res.json(list);
      } else {
        next();
      }
    })
    .catch(err => {
      next(err);
    });
});
// GET one note by id
router.get('/notes/:id', (req, res, next) => {
  const id = req.params.id;
  // Find a note
  notes.find(id)
    .then(item => {
      if (item) {
        res.json(item);
      } else {
        next();
      }
    })
    .catch(err => {
      next(err);
    });
});
// GET BOOM! for fun
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
  if (!updateObj.title) {
    const err = new Error('Missing `title` in request body');
    err.status = 400;
    return next(err);
  }
  // Update a note's content
  notes.update(id, updateObj)
    .then(item => {
      if (item) {
        res.json(item);
      } else {
        next();
      }
    })
    .catch(err => {
      next(err);
    });
});
// POST (insert) a note
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
  notes.create(newItem)
    .then(item => {
      if(item) {
        res.location(`http://${req.headers.host}/notes/${item.id}`).status(201).json(item);
      } else {
        next();
      }
    })
    .catch(err => {
      next(err);
    });
});
// DELETE a note
router.delete('/notes/:id', (req, res, next) => {
  const id = req.params.id;
  // The real note deleting function
  notes.delete(id)
    .then(res.sendStatus(204))
    .catch(err => {
      next(err);
    });
});
module.exports = router;