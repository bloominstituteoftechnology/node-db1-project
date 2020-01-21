const express = require('express');

const db = require("../data/dbConfig")

const router = express.Router();

router.get('/', async (req, res) => {
    db('accounts')
        .then ( accounts => {
             res.status(200).json(accounts)
        })
        .catch (err => {
             res.status(500).json({ message: "Failed to get all accounts"})
        })
})
    
router.get('/:id',  (req, res) => {
    db('accounts').where({id: req.params.id})
    .then ( account => {
        res.status(200).json(account)
    })
    .catch (error => {
        res.status(500).json({ message: "Failed to get all accounts"})
    })
})

router.post("/", (req, res) => {
    db("accounts").insert({ name: req.body.name, budget: req.body.budget })
      .then(account => {
          res.json(account)
      })
      .catch(error =>{
        res.status(500).json({ message: "Could not create account" })
      });
  });
  
  router.put("/:id", (req, res) => {
    db("accounts").where({ id: req.params.id })
      .update({ name: req.body.name, budget: req.body.budget })
      .then(account => {
          res.json(account)
      })
      .catch(error => {
        res.status(500).json({ message: "Could not update account" })
      });
  });
  
  router.delete("/:id", (req, res) => {
    db("accounts").where({ id: req.params.id })
      .del()
      .then(account => {
          res.status(204).send()
      })
      .catch(error => {
        res.status(500).json({ message: "Could not delete account", error })
      });
  });  

module.exports = router;
