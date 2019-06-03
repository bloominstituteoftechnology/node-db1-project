const express = require('express');

const accountRouter = require('./data/accountsRouter.js')
const server = express();
server.use(express.json());

server.use('/api/accounts',accountRouter)

// your code here
server.get('/',(req,res) => {
    res.send(`<h2>Yeah I created a db</h2>`)
})
module.exports = server;