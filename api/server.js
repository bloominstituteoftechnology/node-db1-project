const express = require("express");

const db = require("../data/dbConfig.js");

const server = express();

server.use(express.json());

const port = 3000;

server.get('/api/accounts', (req, res) => {
    const db = req.body
    console.log(req.body)
    res.status(200).send(db)
});

server.get('/api/accounts/name', (req, res) => {
    res.status(200).json({url: '/api/accounts/name', operation: 'GET'});
})

server.get('/api/accounts/budget', (req, res) => {
    res.status(200).json({url: '/api/accounts/name', operation: 'GET'});
})

server.post('/api/accounts', (req, res) => {
   res.status(201).json({url: '/api/accounts', operation: 'POST'})
})

server.post('/api/accounts/name', (req, res) => {
  res.status(201).json({url: '/api/accounts/name', operation: 'POST'})
})

server.post('/api/accounts/budget', (req, res) => {
    res.status(201).json({url: '/api/accounts/budget', operation: 'POST'})
  })

server.put('/api/accounts', (req, res) => {
    res.status(200).json({url: '/api/accounts', operation: 'PUT'})
})

server.put('/api/accounts/name', (req, res) => {
    res.status(200).json({url: '/api/accounts/name', operation: 'PUT'})
})

server.put('/api/accounts/budget', (req, res) => {
    res.status(200).json({url: '/api/accounts/budget', operation: 'PUT'})
})

server.delete('/api/accounts', (req, res) => {
    res.status(204);
})

server.delete('/api/accounts/name', (req, res) => {
    res.status(204);
})

server.delete('/api/accounts/budget', (req, res) => {
    res.status(204);
})

server.listen(port, () => {
    console.log(`Listening one port ${port}`)
})

server.use('/', (req, res) => {
    res.status(200).send('Hello Antoiette')
})

module.exports = server;
