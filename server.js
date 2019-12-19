const express = require('express');

const db = require('./data/dbConfig.js');

const server = express();

server.use(express.json());

server.use((err, req, res, next) => {
    console.log(err)
    return res.status(500).json({ message: 'Something is wrong' })
})

module.exports = server;