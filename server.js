const express = require('express');
const knex = require('knex');
const db = require('./data/dbConfig.js');

const server = express();

server.use(express.json());

server.post("/api/accounts", (req, res) => {
  const account = req.body;
  db('accounts')
  .insert(account, 'id')
  .then(posted => {
    const response = posted[0];
    res.status(200).json(response);
  })
  .catch(error => {
    res.status(500).json(error)
  })
})
server.get("/api/accounts", (req, res) => {
  db('accounts')
  .select()
  .then(accounts => {
    res.status(200).json(accounts);
  })
  .catch(error => {
    res.status(500).json(error)
  })
})
server.put("/api/accounts/:id", (req, res) => {
  const newAccount = req.body;
  const id = req.params.id;
  db('accounts')
  .where({id})
  .update(newAccount)
  .then(count => {
    if(count > 0){
       res.status(200).json({ message: `${count} account(s) updated`})
    } else {
      res.status(404).json({ message: 'not found' });
    }
  })
  .catch(error => res.status(500).json(error));
})

server.delete('/api/accounts/:id', (req, res) => {
  const id = req.params.id;
db('accounts')
.where({id})
.del()
.then(count => {
  if(count > 0){
    res.status(200).json({ message: `${count} account(s) deleted`})
 } else {
   res.status(404).json({ message: 'not found' });
 }
})
.catch(error => {
  res.status(500).json(error);
})
})


module.exports = server; 