const express = require("express"); // import express

const db = require("../data/dbConfig.js"); // import db

const server = express(); //instantiate

server.use(express.json()); //configure

module.exports = server; //export
