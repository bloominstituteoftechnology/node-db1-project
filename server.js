const express = require('express');
const budgetRouter = require("./accounts/accounts-router");
const db = require('./data/dbConfig.js');

const server = express();

server.use(express.json());


server.use("/api/accounts", budgetRouter);

server.get("/", (req, res) => {
  res.send("<h3>DB Helpers with knex</h3>");
});


module.exports = server;

// const express = require("express");

// const PostRouter = require("./posts/post-router.js");

// const server = express();

// server.use(express.json());

// server.use("/api/posts", PostRouter);

// server.get("/", (req, res) => {
//   res.send("<h3>DB Helpers with knex</h3>");
// });

// module.exports = server;