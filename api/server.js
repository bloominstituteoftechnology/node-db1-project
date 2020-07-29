const express = require("express");

const db = require("../data/dbConfig.js");

const server = express();



server.use(express.json());

server.get('/', (req, res) => {
db('accounts')
.then( acc => 
res.json({data: acc})
)
.catch(
    err => {
        res.status(500).json({message: "failed to get accounts"})
    })   
// res.status(200).json({message: "Hello World"})
})


module.exports = server;
