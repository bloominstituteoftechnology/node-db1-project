const express = require('express');

//const db = require('./data/dbConfig.js');

const server = express();

server.use(express.json());

//ROUTES
const accountsAPIRouter = require('./routes/accountsAPIRouter.js');

//ENDPOINTS
server.get('/', (request, responce) => {
  responce.send(`
    <h2>GLOBAL IS UP</h2>
  `);
});

server.use('/api/accountsAPIRouter', accountsAPIRouter);


module.exports = server;
