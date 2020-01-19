const express = require('express');

const db = require('./data/dbConfig.js');

const server = express();

server.use(express.json());

//ROUTES


//ENDPOINTS
server.get('/', (request, responce) => {
  responce.send(`
    <h2>GLOBAL IS UP</h2>
  `);
});


module.exports = server;
