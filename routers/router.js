const express = require('express');
const server = require('../server');
const db = require('../data/dbConfig.js');

const router = express.Router();

router.get('/', (req, res) =>{

    db.select('*').from('accounts')
    .then(account => {
        res.status(200).json({account});
    })
    .catch(error => {
        res.status(500).json({error: "There was a problem w/database"});
    });
    
})

module.exports = router;
