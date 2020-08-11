const express = require("express");
const db = require("./data/dbConfig");

const router = express.Router();

router.get("/", async (req, res, next) => {
  try {
    const accounts = await db.select("*").from("accounts");

    res.json(accounts);
  } catch (err) {
    next(err);
  }
});

router.get("/:id", async (req, res, next) => {
  try {
    const account = await db
      .select("*")
      .from("accounts")
      .where("id", req.params.id)
      .limit(1);

    res.json(account);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
