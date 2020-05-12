const express = require("express");

// database access using knex
const db = require("../data/dbConfig");

const router = express.Router();

router.get("/", (req, res) => {
  console.log("get");
  db.select("*")
    .from("accounts")
    // .first()
    .then((accounts) => {
      res.status(200).json({ data: accounts });
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({ messsage: error.message });
    });
});

router.get("/:id", (req, res) => {
  db("accounts")
    .where({ id: req.params.id })
    .first()
    .then((account) => {
      if (account) {
        res.status(200).json({ data: account });
      } else {
        res.status(404).json({
          message: "No posts by that ID",
        });
      }
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({ message: error.message });
    });
});

router.post("/", (req, res) => {
  const accountUpdate = req.body;

  if (isValidPost(accountUpdate)) {
    db("accounts")
      .insert(accountUpdate, "id")
      .then((newId) => {
        res.status(201).json({ data: newId });
      })
      .catch((error) => {
        console.log(error);
        res.status(500).json({ message: error.message });
      });
  } else {
    res
      .status(400)
      .json({ message: "please provide title and contents for the post" });
  }
});

router.put("/:id", (req, res) => {
  const update = req.body;

  db("accounts")
    .where({ id: req.params.id })
    .update(update)
    .then((count) => {
      if (count > 0) {
        res.status(200).json({ data: count });
      } else {
        res.status(404).json({ message: "record not found by that Id" });
      }
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({ message: error.message });
    });
});

function isValidPost(data) {
  return Boolean(data.name && data.budget);
}

module.exports = router;
