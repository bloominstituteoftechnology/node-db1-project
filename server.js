const express = require('express');

const AccRouter = require('./data/accRouter')



const server = express();

server.use(express.json());

server.use('/api/accounts', AccRouter)

server.get('/', (req, res) => {
    res.send('<h3>Monica, Only Monica, Monica.... MONICA....>.></h3>');
  });


module.exports = server;