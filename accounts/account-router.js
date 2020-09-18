const express = require("express");

const db = require("../data/dbConfig.js");
const router = express.Router();

// router.get("/", (req, res) => {

//   db("accounts")
//     .then((accounts) => {
//       res.json(accounts);
//     })
//     .catch((err) => {
// console.log(err)
//       res.status(500).json({ message: "problem with db", error: err });
//     });
// });
router.get("/", async (req, res) => {
  try {
    const { limit = 5, sortby = "id", sortdir = "desc" } = req.query;
    const accounts = await db("accounts").orderBy(sortby, sortdir).limit(limit);
    res.json(accounts);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "problem with db", error: err });
  }
});
router.get("/:id", validateAccountId, async (req, res) => {
  try {
    const { id } = req.params;
    const account = await db("accounts").where("id", id);
    res.json(account[0]);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "problem with db", error: err });
  }
});
router.post("/", validateAccount, async (req, res) => {
  const accountData = req.body;
  try {
    getByName(req.body.name).then((account) => {
      if (account) {
        res.status(400).json({ message: "required unique name field" });
      } else {
        db("accounts")
          .insert(accountData)
          .then((id) => getById(id[0]))
          .then((account) => {
            res.status(201).json(account);
          })
          .catch((err) => {
            res.status(500).json({ message: "failed", err });
          });
      }
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "problem with db", error: err });
  }
});
router.put("/:id", validateAccountId, validateAccount, async (req, res) => {
  const { id } = req.params;
  const newAccount = req.body;
  try {
    const count = await db("accounts").where("id", id).update(newAccount);
    if (count) {
      res.status(201).json({ updated: count });
    } else {
      res.status(404).json({ message: "invalid id", error: err });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "problem with db", error: err });
  }
});
router.delete("/:id", validateAccountId, async (req, res) => {
  const { id } = req.params;
  try {
    const count = await db("accounts").where("id", id).del();
    if (count) {
      res.status(201).json({ deleted: count });
    } else {
      res.status(404).json({ message: "invalid id", error: err });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "problem with db", error: err });
  }
});

//custom middleware
function validateAccountId(req, res, next) {
  const { id } = req.params;

  getById(id)
    .then((account) => {
      if (account) {
        req.account = account;
        next();
      } else {
        res.status(400).json({ message: "invalid account id" });
      }
    })
    .catch((err) => {
      res.status(500).json({ message: "failed", err });
    });
}

function validateAccount(req, res, next) {
  if (!isEmpty(req.body)) {
    if (!req.body.name) {
      res.status(400).json({ message: "missing required name field" });
    } else if (!req.body.budget) {
      res.status(400).json({ message: "missing required budget field" });
    } else {
      next();
    }
  } else {
    res.status(400).json({ message: "missing account data" });
  }
}
function isEmpty(obj) {
  return Object.keys(obj).length === 0;
}
function getById(id) {
  return db("accounts").where({ id }).first();
}
function getByName(thisName) {
  return db("accounts").where("name", thisName).first();
}

module.exports = router;
