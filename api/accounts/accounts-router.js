/* eslint-disable */
const router = require("express").Router();
const md = require("./accounts-middleware");
const Account = require("./accounts-model");

// GET all accounts * * *
router.get("/", async (req, res, next) => {
  try {
    const accounts = await Account.getAll();
    res.json(accounts);
  } catch (err) {
    next(err);
  }
});

// GET account by :id
router.get("/:id", md.checkAccountId, async (req, res, next) => {
  try {
    const accounts = await Account.getById(req.params.id);
    // console.log(accounts);
    res.json(accounts);
  } catch (err) {
    next(err);
  }
});

// CREATE new account
router.post(
  "/",
  md.checkAccountPayload,
  md.checkAccountNameUnique,
  async (req, res, next) => {
    try {
      const newAccount = await Account.create({
        name: req.body.name.trim(),
        budget: req.body.budget,
      });
      res.status(201).json(newAccount);
    } catch (err) {
      next(err);
    }
  }
);

// UPDATE Account
router.put(
  "/:id",
  md.checkAccountId,
  md.checkAccountPayload,
  async (req, res, next) => {
    try {
      const updated = await Account.updateById(req.params.id, req.body);
      res.json(updated);
    } catch (err) {
      next(err);
    }
  }
);

// DELETE Account
router.delete("/:id", md.checkAccountId, async (req, res, next) => {
  try {
    await Account.deleteById(req.params.id);
    res.json(req.account);
  } catch (err) {
    next(err);
  }
});

router.use((err, req, res, next) => {
  res.status(err.status || 500).json({
    message: err.message,
    stack: err.stack,
  });
});

module.exports = router;
