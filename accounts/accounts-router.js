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

// POST NEW DATA

router.post("/", (req, res) => {
  db("accounts")
    .insert(req.body, "id")
    .then(ids => {
      res.status(201).json({ data: ids });
    })
    .catch(error => {
      res.status(500).json({ message: "There was an error adding new user" });
    });
});

// UPDATE USER

router.put("/:id", (req, res) => {
  const changes = req.body;
  db("accounts")
    .where({ id: req.params.id })
    .update(changes)
    .then(count => {
      if (count > 0) {
        res.status(201).json({ message: "Updated Successfully" });
      } else {
        res.status(404).json({ message: "ID Not found" });
      }
    })
    .catch(error => {
      res.status(500).json({ message: "There was an error updating user" });
    });
});

// DELETE

router.delete("/:id", (req, res) => {
  db("accounts")
    .where({ id: req.params.id })
    .del()
    .then(count => {
      if (count > 0) {
        res.status(201).json({ message: "Deleted Successfully" });
      } else {
        res.status(404).json({ message: "ID Not found" });
      }
    })
    .catch(error => {
      res
        .status(500)
        .json({ message: "There was an error deleting this account" });
    });
});
module.exports = router;
