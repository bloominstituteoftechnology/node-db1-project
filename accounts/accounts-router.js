const express = require("express");

const db = require("../data/dbConfig.js");

const router = express.Router();

router.get("/", (req, res) => {
  db.select("id", "name", "budget")
    //   db("accounts")
    .from("accounts")
    .then(accounts => {
      res.status(200).json(accounts);
    })
    .catch(err => {
      res.status(500).json({ message: "Dang bruh" });
    });
});

router.get("/:id", (req, res) => {
  db("accounts")
    .where({ id: req.params.id })
    .first()
    .then(account => {
      res.status(200).json(account);
    })
    .catch(error => {
      res.status(500).json({ message: "Dang bruh" });
    });
});

router.post("/", (req, res) => {
  const account = req.body;
  db("accounts")
    .insert(account, "id")
    .then(account => {
      res.status(200).json(account);
    })
    .catch(error => {
      res
        .status(500)
        .json({ message: "Error Posting the Post to the desired Post" });
    });
});

router.put("/:id", (req, res) => {
  const changes = req.body;

  db("accounts")
    .where("id", "=", req.params.id)
    .update(changes)
    .then(count => {
      if (count > 0) {
        res.status(200).json(count);
      } else {
        res.status(404).json({ message: "That account is not an account" });
      }
    })
    .catch(err => {
      res.status(500).json({
        message: "Error in puting the put to the desired post you wanted to put"
      });
    });
});

router.delete("/:id", (req, res) => {
  db("accounts")
    .where("id", "=", req.params.id)
    .del()
    .then(count => {
      if (count > 0) {
        res.status(200).json(count);
      } else {
        res.status(404).json({ message: "That account is not an account" });
      }
    })
    .catch(error => {
      res.status(500).json({ message: "All your account are belong to us" });
    });
});

module.exports = router;
