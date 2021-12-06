const express = require("express");
const server = express();

server.use(express.json());
server.use('/api/accounts', accountsRouter)
server.use('*', notFound)
server.use(errorHandling)

const errorHandling = (err, req, res, next) => {
    const status = err.status || 500
    res.status(status).json({
        message: err.message,
})
}


const notFound = (req, res, next) => {
    res.status(404).json({
        message: 'Not found'
})
}


module.exports = server;
