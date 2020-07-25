const express = require("express");

const db = require("../data/dbConfig.js");

const server = express();



server.use(express.json());

server.get('/', (req, res) => {
db.select('*').from('accounts')
.then( acc => 
res.status(200).json({data: acc})
)
.catch(
    err => console.log(err)
)
})


module.exports = server;
