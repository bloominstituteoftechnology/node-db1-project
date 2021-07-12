const express = require("express")

const server = express()

const accountsRouter = require('./accounts/accounts-router')

const notFound = (req, res, next) => { // eslint-disable-line
    res.status(404).json({
        message: 'Not found, sorry!'
    })
}

const errorHandling = (err, req, res, next) => { // eslint-disable-line
    const status = err.status || 500
    res.status(status).json({
        message: err.message,
    })
}

server.use(express.json())

server.use('/api/accounts', accountsRouter)

server.use('*', notFound)

server.use(errorHandling)

module.exports = server
