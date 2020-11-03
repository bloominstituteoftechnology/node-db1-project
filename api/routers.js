const express = require("express");
const { insert } = require("../data/dbConfig");
const db = require("../data/dbConfig");
const router = express.Router();

// DB HELPERS
const Accts = {
  getAll() {
    return db("accounts");
  },
  getById(id) {
    return db("accounts").where({ id });
  },
  create(acct) {
    return db("accounts").insert(acct);
  },
  update(id, acct) {
    return db("accounts").where({ id }).update(acct);
  },
  delete(id) {
    return db("accounts").where({ id }).del();
  },
};

// ENDPOINTS
// GET all accounts
router.get("/", async (req, res, next) => {
  try {
    const allAccts = await Accts.getAll();
    if (!allAccts) {
      res.json({ message: "Error getting accounts" });
    } else {
      res.json(allAccts);
    }
  } catch (err) {
    res.json({ message: err.message });
  }
});

//#region
// Alt Method
// router.get("/", (req, res) => {
//   Accts.getAll()
//     .then((data) => {
//       res.json(data);
//     })
//     .catch((err) => {
//       res.json({ err: err.message });
//     });
// });
//#endregion

router.get("/:id", async (req, res) => {
  try {
    const getAcct = await Accts.getById(req.params.id);
    if (!getAcct) {
      res.json({ message: "No account with that ID" });
    } else {
      res.json(getAcct);
    }
  } catch (err) {
    res.json({ message: err.message });
  }
});

// POST a new account
router.post("/", async (req, res) => {
  try {
    const newAcct = await Accts.create(req.body);
    if (!newAcct) {
      res.json({ message: "Error in creating new account." });
    } else {
      res.json({ message: "Created new account!" });
    }
  } catch (err) {
    res.json({ message: err.message });
  }
});

// DELETE an account
router.delete("/:id", async (req, res) => {
  try {
    const delAcct = await Accts.delete(req.params.id);
    if (!delAcct) {
      res.json({ message: "No account with given ID" });
    } else {
      res.json({ message: "Account deleted successfully" });
    }
  } catch (err) {
    res.json({ message: err.message });
  }
});

// UPDATE an account
router.put("/:id", async (req, res) => {
  try {
    const updatedAcct = await Accts.update(req.params.id, req.body);
    if (!updatedAcct) {
      res.json({ message: "No account with that ID" });
    } else {
      const viewAcct = await Accts.getById(req.params.id);
      res.json(viewAcct);
    }
  } catch (err) {
    res.json({ message: err.message });
  }
});

// Error Middleware
router.use((err, req, res, next) => {
  console.log("ERR", err);
  res.status(500).json({ message: err.message });
});

module.exports = router;
