const express = require('express'); //import express

const db = require('../data/dbConfig') //import data

const router = express.Router(); //setup Router

//CRUD BELOW >>>

function bodyCheck(req, res, next) {
  if (req.body.name && req.body.budget) {
    next();
  } else {
    res.status(400).json({ message: "Please include the required fields!" });
  }
}

module.exports = router;