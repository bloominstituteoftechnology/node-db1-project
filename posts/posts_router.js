const express = require('express');

const db = require('../data/dbConfig.js');

const router = express.Router();

router.get('/', (req, res) => {
    db('posts')
        .then(posts => {
            res.status(200).json(posts);
        })
        .catch(error => {
            res.status(500).json({ message: 'error getting the posts!' })
        })
})



module.exports = router;