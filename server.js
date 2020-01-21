const express = require("express");

const db = require("./data/dbConfig.js");

const server = express();

server.use(express.json());

server.get("/api/accounts", (req, res) => {
  db.select("*")
    .from("accounts")
    .then(accounts => {
      res.status(200).json(accounts);
    })
    .catch(error => {
      console.log(error);
      res.status(500).json({ error: "something went wrong" });
    });
});

server.get("/api/accounts/:id", (req, res) => {
  db.select("*")
    .from("accounts")
    .where("id", req.params.id)
    .first()
    .then(account => {
      res.status(200).json(account);
    })
    .catch(error => {
      console.log(error);
      res.status(500).json({ error: "something went wrong" });
    });
});

server.post("/api/accounts", (req, res) => {
  const { name, budget } = req.body;
  const newAccount = { name, budget };

  db.select("*")
    .from("accounts")
    .insert(newAccount)
    .then(account => {
      res.status(201).json(account);
    })
    .catch(error => {
      console.log(error);
      res.status(500).json({ error: "mistakes were made" });
    });
});

server.put("/api/accounts/:id", (req, res) => {
  const edit = req.body;

  db.select("*")
    .from("accounts")
    .where("id", req.params.id)
    .update(edit)
    .then(edited => {
      res.status(200).json(edited);
    })
    .catch(error => {
      console.log(error);
      res.status(500).json({ error: "account didn't update" });
    });
});

server.delete("/api/accounts/:id", (req, res) => {
  db.select("*")
    .from("accounts")
    .where("id", req.params.id)
    .delete()
    .then(deleted => {
      res.status(200).json(deleted);
    })
    .catch(error => {
      console.log(error);
      res.status(500).json({ error: "did not delete" });
    });
});

module.exports = server;
