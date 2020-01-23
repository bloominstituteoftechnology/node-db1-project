const express = require('express');

// need to bring the router here
const accountsRouter = require('./accounts/accountsRouter.js');

// creates server
const server = express();

// teaches how to read json
server.use(express.json());

// end point here
server.use('/api/accounts', accountsRouter);

// checking if server is listening
server.get('/', (req, res) =>{
    res.send('I am ready and running!')
})


module.exports = server;