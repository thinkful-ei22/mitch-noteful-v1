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

router.get('/notes', (req, res, next) => {
  const { searchTerm } = req.query;

  notes.filter(searchTerm, (err, list) => {
    if (err) {
      return next(err); // goes to error handler
    }
    res.json(list); // responds with filtered array
  });
});

router.get('/notes/:id/', (req, res) => {
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

router.get('/boom', (req, res, next) => {
  throw new Error('Boom!!');
});

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

module.exports = router;