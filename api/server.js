const express = require("express");

const db = require("../data/dbConfig.js");

const server = express();

server.use(express.json());

const port = 3000;

server.get('/api/accounts', (req, res) => {
    res.status(200).send("Hello Antoinette")
});

server.post('/api/accounts', (req, res) => {
     title: req.body.title 
    res.status(201).json({url: '/api/accounts', operation: 'POST'})
})

server.put('/api/accounts', (req, res) => {
    res.status(200).json({url: '/api/accounts', operation: 'PUT'})
})

server.delete('/api/accounts', (req, res) => {
    res.status(204);
})
server.listen(port, () => {
    console.log(`Listening one port ${port}`)
})

module.exports = server;
