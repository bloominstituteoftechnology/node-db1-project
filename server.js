const express = require('express');

// const db = require('./data/dbConfig.js');
const PostRouter = require('./accounts/accounts-router.js');

const server = express();

server.use(express.json());

server.use('/api/accounts', PostRouter);

server.get('/', (req, res) => {
  res.send('<h3>WEB DB Challenge...</h3>')
})

module.exports = server;