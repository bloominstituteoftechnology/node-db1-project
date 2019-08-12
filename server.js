const express = require('express');

const PostRouter = require('./posts/posts_router.js');

//const db = require('./data/dbConfig.js');

const server = express();

server.use(express.json());

server.use('/api/posts', PostRouter);

server.get('/', (req, res) => {
    res.send('<h3>DB Helpers with Knex</h3>')
});



module.exports = server;