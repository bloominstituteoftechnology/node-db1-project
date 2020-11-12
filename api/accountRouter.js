const express = require("express");

//database access using knex
const db = require("../data/dbConfig.js");

const router = express.Router();

//GET requests
router.get("/", (req, res) => {
  db.select("*")
    .from("accounts")
    .then((accounts) => {
      res.status(200).json(accounts);
    })
    .catch((err) => {
      console.log(err);
      res
        .status(500)
        .json({ errorMessage: "Failed to retrieve the list of accounts." });
    });
});

router.get("/:id", (req, res) => {
  const id = req.params.id;
  db("accounts")
    .where({ id })
    .first()
    .then((account) => {
      if (!account) {
        res.status(404).json({
          errorMessage: "The account with the specified ID does not exist.",
        });
      } else {
        res.status(200).json(account);
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        errorMessage: "Failed to retrieve the account with the specified ID.",
      });
    });
});

//POST requests
router.post("/", (req, res) => {
  if (!req.body.name) {
    res.status(400).json({
      errorMessage: "Please provide a name and budget for the account.",
    });
  } else {
    db("accounts")
      .insert(req.body, "id")
      .then((account) => {
        res.status(201).json(account);
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json({ errorMessage: "Failed to add the account." });
      });
  }
});

//PUT requests
router.put("/:id", (req, res) => {
  const id = req.params.id;
  db("accounts")
    .where({ id })
    .update(req.body)
    .then((count) => {
      if (count) {
        res.status(200).json(count);
      } else {
        res.status(404).json({
          errorMessage: "The account with the specified ID does not exist.",
        });
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ errorMessage: "Failed to update the account." });
    });
});

//DELETE requests
router.delete("/:id", (req, res) => {
  const id = req.params.id;
  db("accounts")
    .where({ id })
    .del()
    .then((count) => {
      if (!count) {
        res.status(404).json({
          errorMessage: "The account with the specified ID does not exist.",
        });
      } else {
        res.status(200).json(count);
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ errorMessage: "Failed to delete account." });
    });
});

module.exports = router;
