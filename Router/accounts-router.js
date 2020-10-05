const express = require("express");

const db = require("../data/dbConfig");

const router = express.Router();

function bodyCheck(req, res, next) {
  if (req.body.name && req.body.budget) {
    next();
  } else {
    res.status(400).json({ message: "Please Include the required fields!" });
  }
}

router.get("/", (req, res) => {
  db.select("*")
    .from("accounts")
    .then((resp) => {
      res.status(200).json({ data: resp });
    })
    .catch((err) => {
      res.status(500).json({ error: err.message });
    });
});

router.get("/:id", (req, res) => {
  db("accounts")
    .where({ id: req.params.id })
    .then((resp) => {
      res.status(200).json({ data: resp });
    })
    .catch((err) => {
      res.status(500).json({ error: err.message });
    });
});

router.put("/:id", bodyCheck, (req, res) => {
  db("accounts")
    .where({ id: req.params.id })
    .update(req.body)
    .then((resp) => {
      res
        .status(201)
        .json({ Data: resp })
        .catch((err) => {
          res.status(500).json({ error: err.message });
        });
    });
});

router.post("/", bodyCheck, (req, res) => {
  db("accounts")
    .insert(req.body)
    .then((resp) => {
      res.status(201).json({ data: resp });
    })
    .catch((err) => {
      res.status(500).json({ error: err.message });
    });
});

router.delete("/:id", (req, res) => {
  db("accounts")
    .delete()
    .where({ id: req.params.id })
    .then((resp) => {
      res.status(200).json(resp);
    })
    .catch((err) => {
      res.status(500).json({ error: err.message });
    });
});

module.exports = router;
