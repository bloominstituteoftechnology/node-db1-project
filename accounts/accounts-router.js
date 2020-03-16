const express = require("express");

const db = require("../data/dbConfig");

const router = express.Router();

// GET ACCOUNTS

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

// GET ACCOUNTS BY ID

router.get("/:id", (req, res) => {
  db("accounts")
    .where({ id: req.params.id })
    .first()
    .then(row => {
      if (row) {
        res.status(200).json({ data: row });
      } else {
        res.status(404).json({ data: "Not Found" });
      }
    })
    .catch(error => {
      res
        .status(500)
        .json({ message: "There was an error with this id", error });
    });
});

module.exports = router;
