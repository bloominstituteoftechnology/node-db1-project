const express = require("express");

const db = require("../data/dbConfig");

const router = express.Router();

router.get("/", async (req, res, next) => {
  try {
    res.json(await db.select("*").from("accounts"));
  } catch (err) {
    next(err);
  }
});

router.get("/:id ", async (req, res, next) => {
  try {
  } catch (err) {
    next(err);
  }
});

router.post("/", async (req, res, next) => {
  try {
  } catch (err) {
    next(err);
  }
});

router.put("/", async (req, res, next) => {
  try {
  } catch (err) {
    next(err);
  }
});

router.delete("/", async (req, res, next) => {
  try {
  } catch (err) {
    next(err);
  }
});

module.exports = router;
