const express = require("express");

// database access using knex
const knex = require("../data/dbConfig"); // renamed this from db

const router = express.Router();

router.get("/", (req, res) => {
  // list of posts
  // SELECT * from Posts
  // returns a promise
  knex
    .select("*")
    .from("accounts")
    .then(accounts => {
      res.status(200).json(accounts);
    })
    .catch(error => {
      res.status(500).json({ error: "Failed to get posts from database" });
    });
});

router.get("/:id", (req, res) => {
  knex
    .select("*")
    .from("accounts")
    .where("id", "=", req.params.id)
    .first()
    .then(accounts => {
      res.status(200).json(accounts);
    })
    .catch(error => {
      res.status(500).json({ error: "Failed to get post from database" });
    });
});

router.post("/", validateAccount, (req, res) => {
  // remember to validatedata sent by the client
  knex
    .insert(req.body, "id") // ignore the console warning on SQLite
    .into("accounts")
    .then(ids => {
      res.status(201).json(ids);
    })
    .catch(error => {
      res.status(500).json({ error: "Failed to insert post" });
    });
});

router.put("/:id",  validateAccount,(req, res) => {
  const changes = req.body;

  // validate the data before calling the database

  knex("accounts")
    .where({ id: req.params.id })
    .update(changes)
    .then(count => {
      // count: how many records/rows were updated
      res.status(200).json(count);
    })
    .catch(error => {
      res.status(500).json({ error: "Failed to update post" });
    });
});

router.delete("/:id", (req, res) => {
  const changes = req.body;

  // validate the data before calling the database

  knex("accounts")
    .where({ id: req.params.id })
    .del()
    .then(count => {
      // count: how many records/rows were delete
      res.status(200).json(count);
    })
    .catch(error => {
      res.status(500).json({ error: "Failed to delte post" });
    });
});

// Validate body on create/update account request - FUNCTIONAL
function validateAccount(req, res, next) {
  if (!Object.keys(req.body).length) {
    res.status(400).json({ message: 'Missing account data!' });
  } else if (!req.body.name) {
    res.status(400).json({ message: 'Missing required "name" field!' });
  } else if (!req.body.budget) {
    res.status(400).json({ message: 'Missing required "budget" field!' });
  } else {
    next();
  }
}

module.exports = router;
