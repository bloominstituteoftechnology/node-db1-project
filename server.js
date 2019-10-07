const express = require('express');

// const db = require('./data/dbConfig.js');

const server = express();

server.use(express.json());


const accountsR = require('./data/accountsRouter.js');
server.use('/api/accounts', accountsR);


server.get('/', (req, res) => {
    res.send(`
      <h2>Lambda WEP DB Challenge :)</h>
      <p>Let's get started... </p>
    `);
});

module.exports = server;