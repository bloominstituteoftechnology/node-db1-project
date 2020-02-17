const express = require("express");
const router = express.Router();
const Db = require("../data/dbConfig");

//  GET =======>

router.get("/", (req, res) => {
  Db.get()
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
  if (account.project_id && account.description && account.notes) {
    Db.insert(account)
      .then(() => {
        res.status(200).json({ message: "Add new account to database." });
      })
      .catch(() => {
        res.status(400).json({
          message: "Error occurred when adding new account to database"
        });
      });
  } else {
    res.catch(() => {
      res
        .status(500)
        .json({ message: "Unable to add new account to database." });
    });
  }
});

//  PUT =======>

router.put("/:id", (req, res) => {
  const { id } = req.params;
  const newAccount = req.body;
  if ((newAccount.description, newAccount.notes, newAccount.project_id)) {
    actionsDB.update(id, newAccount).then(() => {
      res.status(200).json({ message: "Account successfully updated" });
    });
  } else {
    res.catch(() => {
      res.status(400)({ message: "Error with request." });
    });
    res.catch(() => {
      res.status(500).json({ message: "Error updating Account" });
    });
  }
});

//  DELETE =======>

router.delete("/:id", (req, res) => {
  const { id } = req.params;
  DB.remove(id);
  then(account => {
    res.json(account);
  }).catch(() => {
    res
      .status(500)
      .json({ message: "Error removing account from database." });
  });
});


module.exports = router;

