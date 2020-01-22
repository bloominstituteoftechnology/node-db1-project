const express = require('express');
const database = require('../dbConfig');
const router = express.Router();
const knex = require('../dbConfig');

router.get('/', (request, response) => {

    knex
    .select('*')
    .from('accounts')
    .then(accounts => {
        response.status(200).json(accounts);
    })
    .catch(error => {
        response.status(500).json({
            errorMsg: `Error retrieving accounts. ${error}`
        })
    })
})


router.get('/:id', (request, response) => {
    knex
    .select('*')
    .from('accounts')
    .where({id: request.params.id})
    .first() // accounts[0]
    .then(post => {
        response.status(200).json(post)
    })
    .catch(error => {
        response.status(500).json({
            errorMsg: `Error retrieving the account. ${error}`
        })
    })
})

