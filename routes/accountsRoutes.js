const express = require("express");
const router = express.Router();
const Db = require("../data/dbConfig");

//  GET =======>

router.get("/", (req, res) => {
  Db("accounts")
    .then(accounts => {
      res.status(200).json(accounts);
    })
    .catch(err => {
      res
        .status(500)
        .json({ message: "Could not retrieve data from database" });
    });
});

router.get("/:id", (req, res) => {
  const { id } = req.params;
  Db.get(id)
    .then(accounts => {
      res.json(accounts);
    })
    .catch(() => {
      res
        .status(500)
        .json({ message: "Error retrieving account from database." });
    });
});

//  POST =======>

router.post("/", (req, res) => {
  const account = req.body;
  if (account.name && account.budget) {
    //  INSERT INTO Accounts (account)
    Db("Accounts")
      .insert(account)
      .then(account => {
        res
          .status(200)
          .json({ message: "Created new account.", response: account });
      })
      .catch(err => {
        res.status(400).json({
          message: "Error occurred when adding new account to database",
          error: err
        });
      });
  } else {
    res.status(400).json({
      message: "Unable to add new account to database due to missing data."
    });
  }
});

//  PUT =======>

router.put("/:id", (req, res) => {
  const { id } = req.params;
  Db("accounts")
    .where({ id })
    .update(req.body)
    .then(updVal => {
      res.json(updVal);
    })
    .catch(error => {
      console.log("put error");
      res.status(500).json({ message: "Update failed" });
    });
});

//  DELETE =======>

router.delete("/:id", (req, res) => {
  const { id } = req.params;
  Db("accounts")
    .where({ id })
    .del()
    .then(deleted => {
      res.json(deleted);
    })
    .catch(error => {
      console.log("delete error");
      res
        .status(500)
        .json({ message: "Error removing account from database." });
    });
});

module.exports = router;
