const { Router } = require('express');
const ensureAuth = require('../middleware/ensure-auth');
const Gram = require('../models/gram');

module.exports = Router()
  .post('/', ensureAuth, (req, res, next) => {
    Gram
      .insert({ ...req.body, userId: req.user.id })
      .then(tweet => res.send(tweet))
      .catch(next);
  })

  .get('/', (req, res, next) => {
    Gram
      .findAll()
      .then(gram => res.send(gram))
      .catch(next);
  })
