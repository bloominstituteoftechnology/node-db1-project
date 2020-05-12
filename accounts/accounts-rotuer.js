const express = require("express");

// database access using knex
const db = require("../data/db-config.js");

const router = express.Router();

function isValidPost(post) {
  return Boolean(post.title && post.contents);
}

module.exports = router;
