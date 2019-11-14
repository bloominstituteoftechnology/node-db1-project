const express = require("express");

const db = require("./data/dbConfig.js");

const server = express();

server.use(express.json());

server.get("/accounts", (req, res) => {
  db("accounts")
    .then(account => res.status(200).json(account))
    .catch(err =>
      res.status(500).json({ message: "Could not retrieve account" })
    );
});

server.get("/accounts/:id", (req, res) => {
  const id = req.params.id;
  db.select("*")
    .from("accounts")
    .where({ id })
    .then(account => res.status(200).json(account));
});

server.post("/accounts", (req, res) => {
  accountBody = req.body;
  db("accounts")
    .insert(accountBody)
    .then(account => res.status(201).json(account))
    .catch(err =>
      res.status(500).json({ message: "Could not add new account" })
    );
});

server.put("/accounts/:id", (req, res) => {
  const id = req.params.id;
  const changes = req.body;
  db("accounts")
    .where({ id })
    .update(changes)
    .then(account => res.status(200).json(account))
    .catch(err =>
      res.status(500).json({ message: "Could not update account" })
    );
});

server.delete("/accounts/:id", (req, res) => {
  const id = req.params.id;
  db("accounts")
    .where({ id })
    .del()
    .then(account => res.status(200).json({ message: "Account was deleted" }))
    .catch(err => res.status(500).json({ message: "Count not delete accout" }));
});
module.exports = server;
