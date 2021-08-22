const express = require('express')
const router = require('./accounts/accounts-router.js')

const server = express()

server.use(express.json())
server.use('/api/accounts', router)

server.get('/', (req, res) => {
  res.status(200)
    .json({ api: 'up' })
})
module.exports = server
