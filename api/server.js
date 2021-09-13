const express = require("express");

const server = express();

server.use(express.json());

server.use('*', (req, res) => {
    console.log('this is the catch-all fallback')
    res.status(404).json({
        message: 'not found'
    })
})

module.exports = server;
