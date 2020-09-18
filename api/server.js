const express = require("express");
const server = express();

const db = require("../data/dbConfig.js");



server.use(express.json());
const PORT = 5000;

server.listen(PORT, () => {
    console.log(`listening on port ${PORT}...`);
});

module.exports = server;
