const express = require('express');

const db = require('./accounts/accounts-Router.js');

const server = express();

server.use(express.json());

server.use('/api/accounts', db);


server.get('/', (req, res) => {
    res.send('<h3>Hello from Server 4000</h3>');
  });



  
module.exports = server;