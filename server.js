const express = require('express');

const db = require('./data/dbConfig.js');

const server = express();
server.use(express.json());


server.get('/', (req, res) => {
    db.select('*').from('accounts')
    .then(accounts => {
        res.status(200).json(accounts)
    }).catch(err => {
        console.log(err)
        res.status(500).json({error: "failed to find the list of accounts"})
    })
});

server.get('/:id', (req, res) => {
    db('accounts').where( {id: req.params.id})
    .first()
    .then(account => {
        res.status(200).json(account)
    })
    .catch(error => {
        console.log(error)
        res.status(500).json({error: "failed to load the account with that ID"})
    })
})

server.post('/', (req,res) => {
    const postInfo = req.body
    db('accounts').insert(postInfo, 'id')
        .then(ids => {
            db('accounts')
            .where('id', ids[0])
            .then(account =>{
                res.status(201).json(account)
            })
        })
        .catch(error => {
            console.log(error)
            res.status(500).json({error: "failed to add the account"})
        })
});

    server.put('/:id', (req, res) => {
        const id = req.params.id
        const changes = req.body
        db('accounts').where({id: id}).update(changes)
        .then(count => {
            res.status(200).json(count)
        })
        .catch(error => {
            console.log(error)
            res.status(500).json({error: "failed to update the account"})
        })
    })

    server.delete('/:id', (req, res) => {
        db('accounts').where({id: req.params.id}).del()
        .then( count => {
            res.status(200).json(count)
        })
        .catch(error => {
            console.log(error)
            res.status(500).json({error: "failed to delete the account"})
        })
    })


module.exports = server;