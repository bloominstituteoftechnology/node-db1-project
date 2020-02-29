const express = require("express");

const db = require("./data/dbConfig.js");
const accountRouter = require("./accounts/router.js")

const server = express();

server.use(express.json());
server.use('/api/accounts', router)

servver.get('/', (req, res) => {
    return res.send('<h2>This is in the server.</h2>')
})

server.use((err, req, res, next) => {
    console.log(err)
    return res.status(500).json({ message: 'Something in the server is wrong.'})
})

module.exports = server;