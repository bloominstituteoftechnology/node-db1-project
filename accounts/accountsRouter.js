const express = require("express");
const db = require("../data/dbConfig.js");

const router = express.Router();

// GET get accounts
router.get("/", async (req, res, next) => {
  try {
    const accounts = await db.select("*").from("accounts");
    res.json(accounts);
  } catch (err) {
    next(err);
  }
});

// GET account by Id
router.get("/:id", async (req, res, next) => {
  try {
    const account = await db("accounts")
      .first()
      .from("accounts")
      .where("id", req.params.id);
    res.json(account);
  } catch (err) {
    next(err);
  }
});

// POST create account
router.post("/", async (req, res, next) => {
  try {
    const payload = {
      name: req.body.name,
      budget: req.body.budget,
    };

    const [id] = await db("accounts").insert(payload);
    const account = await db("accounts").where("id", id).first();
    res.json(account);
  } catch (err) {
    next(err);
  }
});

//PUT update account
router.put("/:id", async (req, res, next) => {
  try {
    const payload = {
      name: req.body.name,
      budget: req.body.budget,
    };

    await db("accounts").where("id", req.params.id).update(payload);
    const update = await db("accounts").where("id", req.params.id).first();
    res.json(update);
  } catch (err) {
    next(err);
  }
});

//DELETE delete account
router.delete("/:id", async (req, res, next) => {
  try {
    await db("accounts").where("id", req.params.id).del();
    res.status(204).end();
  } catch (err) {
    next(err);
  }
});

module.exports = router;