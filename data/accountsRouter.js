const express = require("express");
const router = express.Router();

const db = require("./dbConfig");

router.get("/", handleAllGetAccounts);
router.get("/:id", handleAccountsGetById);
router.post("/", handleAccountsPost);
router.put("/:id", handleAccountsPut);
router.delete("/:id", handleAccountsDelete);

function handleAccountsDelete(req, res) {
  db("accounts").where({ id: req.params.id })
    .delete()
    .then(data => {
      console.log(data);
      res.status(200).json(data);
    })
    .catch(error => {
      console.log(error);
      res.status(500).json(error);
    });
}

function handleAccountsPut(req, res) {
  db("accounts")
    .where({ id: req.params.id })
    .update({ name: req.body.name, budget: req.body.budget })
    .then(data => {
      console.log(data);
      res.status(201).json(data);
    })
    .catch(error => {
      console.log(error);
      res.status(500).json(error);
    });
}

function handleAccountsPost(req, res) {
  db("accounts")
    .insert({ name: req.body.name, budget: req.body.budget })
    .then(data => {
      console.log(data);
      res.status(201).json(data);
    })
    .catch(error => {
      console.log(error);
      res.status(500).json(error);
    });
}

function handleAccountsGetById(req, res) {
  db("accounts")
    .where({ id: req.params.id })
    .then(data => {
      console.table(data);
      res.status(200).json(data);
    })
    .catch(error => {
      console.log(error);
      res.status(500).json(error);
    });
}

function handleAllGetAccounts(req, res) {
  db("accounts")
    .then(data => {
      console.table(data);
      res.status(200).json(data);
    })
    .catch(error => {
      console.log(error);
      res.status(500).json(error);
    });
}

module.exports = router;
