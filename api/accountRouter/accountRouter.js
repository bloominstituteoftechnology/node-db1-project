const express = require("express");

const db = require("../../data/dbConfig");

const router = express.Router();

router.get("/", (req, res) => {
  db("accounts")
    .then((account) => {
      res.status(200).json(account);
    })
    .catch((err) => {
      res.status(500).json({
        errorMessage: "The list of accounts could not be retrieved.",
      });
    });
});

router.get("/:id", (req, res) => {
  const { id } = req.params;

  db("accounts")
    .where({ id })
    .then((account) => {
      if (account.length) {
        res.status(200).json(account);
      } else {
        res.status(404).json({
          errorMessage: "This account id could not be retrieved",
        });
      }
    })
    .catch((err) => {
      res.status(500).json({
        errorMessage: "Failed to retrieve account",
      });
    });
});

router.post("/", (req, res) => {
  const newAccount = {
    name: req.body.name,
    budget: req.body.budget,
  };

  db("accounts")
    .insert(newAccount)
    .then((account) => {
      res.status(201).json(account);
    })
    .catch((err) => {
      res.status(500).json({
        errorMessage: "This accont could not be created",
      });
    });
});

router.put("/:id", (req, res) => {
  const { id } = req.params;

  const updateAccount = {
    name: req.body.name,
    budget: req.body.budget,
  };

  db("accounts")
    .where({ id })
    .update(updateAccount)
    .then((account) => {
      res.status(200).json(account);
    })
    .catch((err) => {
      res.status(500).json({
        errorMessage: "This account could not be updated",
      });
    });
});

router.delete("/:id", (req, res) => {
  const { id } = req.params;

  db("accounts")
    .where({ id })
    .del()
    .then((account) => {
      res.status(204).json({
        message: "This account has been deleted!",
      });
    })
    .catch((err) => {
      res.status(500).json({
        errorMessage: "this account could not be deleted",
      });
    });
});

module.exports = router;
