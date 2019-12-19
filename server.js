const express = require('express');
const accountRouter = require('./accounts/account-router')

const server = express();

server.use(express.json());
server.use('/api/accounts', accountRouter) //import router into server.

server.get('/', (req, res) => {
    return res.send('<h2> I am in the server.</h2>')
})

server.use((err, req, res, next) => {
    console.log(err)
    return res.status(500).json({ message: 'Something is wrong' })
})

module.exports = server; 

// error 404 means to check your server.use /api/ router