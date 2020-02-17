const express = require('express');
const server = require('../server');
const db = require('../data/dbConfig.js');

const router = express.Router();

router.get('/accounts', (req, res) =>{

    db('accounts')
    .then(account => {
        res.status(200).json({account});
    })
    .catch(error => {
        res.status(500).json({error: "There was a problem w/database"});
    });
    
});

router.get('/accounts/:id', (req, res) => {
    db('accounts').where({id: req.params.id})
    .then(account => {
        res.status(200).json(account);
    })
    .catch(error => {
        res.status(500).json({error: "There was a problem getting that account"});
    });
});

router.post('/accounts', (req, res) => {

});

router.put('/:id', (req, res) => {

});

router.delete('/:id', (req, res) => {

});

module.exports = router;
