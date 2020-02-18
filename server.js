const express = require('express');
const db = require('./data/dbConfig.js');
const server = express();

server.use(express.json());

server.get("/api/accounts", (req, res) => {
  db("accounts")
    .then(accounts => {
      res.status(200).json(accounts);
    })
    .catch(() => {
      res.status(500).json("Error reading account");
    });
});

server.get("/api/accounts/:id", (req, res) => {
  db("accounts")
    .where({ id: req.params.id })
    .first()
    .then(account => {
      if (account) {
        res.status(200).json(account);
      }
      else {
        res.status(400).json(`There is no account with id=${req.params.id}`)
      }
    })
    .catch(() => {
      res.status(500).json("Error reading account");
    });
});

server.post("/api/accounts", (req, res) => {
  db("accounts")
    .insert(req.body)
    .then(ids => {
      db("accounts")
      .where({ id: ids[0] })
      .then(account => {
        res.status(201).json(account);
      })
      .catch(() => {
        res.status(500).json("Error reading account");
      });
    })
    .catch(() => {
      res.status(500).json("Error creating account");
    })
});

server.put("/api/accounts/:id", (req, res) => {
  db("accounts")
    .where({ id: req.params.id })
    .update(req.body)
    .then(numRecordsUpdated => {
      if (numRecordsUpdated === 1) {
        db("accounts")
          .where({ id: req.params.id })
          .then(account => {
            res.status(200).json(account);
          })
          .catch(() => {
            res.status(500).json("Error reading account");
          });
      }
      else {
        res.status(400).json(`There is no account with id=${req.params.id}`);
      }
    })
    .catch(() => {
      res.status(500).json("Error updating account");
    })
});

server.delete("/api/accounts/:id", (req, res) => {
  db("accounts")
    .delete()
    .where({ id: req.params.id })
    .then(() => {
      res.status(200).json("Delete OK");
    })
    .catch((e) => {
      res.status(500).json(e);
    });
});

module.exports = server;