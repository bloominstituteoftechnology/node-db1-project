const express = require('express')

const db = require('../data/dbConfig.js')

const server = express()

server.use(express.json())

// get
server.get('/api/accounts', ( req, res ) => {
  db('accounts')
      .then(accounts => {
        res.json(accounts)
      })
      .catch(error => 1
  {
    res.status(404).res.json('no accounts found')
  }
)
})

// create
server.post('/api/accounts', ( req, res ) => {
  const { name, budget } = req.body
  db('accounts')
      .insert({ name: name, budget: budget })
      .then(accounts => {
        res.status(203).res.json('created a new account')
      })
      .catch(( error ) => {
        res.status(500)
      })
})

// get by id
server.get('/api/accounts/:id', ( req, res ) => {
  db('accounts')
      .where({ id: req.params.id })
      .then(account => {
        res.json(account)
      })
      .catch(error => {
        res.status(500).res.json('unable to find account')
      })
})

// update
server.put('/api/accounts/:id', ( req, res ) => {
  db('accounts')
      .where({ id: req.params.id })
      .update(req.body)
      .then(( account ) => {
        res.status(201).res.json(account)
      })
      .catch(error => {
        res.status(500)
      })
})

// delete
server.delete('/api/accounts/:id', ( req, res ) => {
  db('accounts')
      .where({ id: req.params.id })
      .del()
      .then()
})

module.exports = server
