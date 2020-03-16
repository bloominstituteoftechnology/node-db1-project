const express = require("express");

const db = require("../data/dbConfig");

const router = express.Router();

router.get("/", (req, res) => {
  db.select("*")
    .from("accounts")
    .then(row => {
      res.status(200).json({ data: row });
    })
    .catch(error => {
      res.status(500).json({ message: "Sorry there was an error", error });
    });
});

module.exports = router;
