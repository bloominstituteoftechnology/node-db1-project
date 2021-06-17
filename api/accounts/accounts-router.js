const router = require("express").Router();
const {
  checkAccountId,
  checkAccountNameUnique,
  checkAccountPayload,
} = require("./accounts-middleware.js");
const Account = require("./accounts-model.js");

router.get("/", async (req, res, next) => {
  try {
    const data = await Account.getAll();
    res.json(data);
  } catch (err) {
    next(err);
  }
});

router.get("/:id", checkAccountId, (req, res) => {
  res.status(200).json(req.account);
});

router.post(
  "/",
  checkAccountPayload,
  checkAccountNameUnique,
  async (req, res, next) => {
    try {
      const newAccount = await Account.create({
        name: req.body.name.trim(),
        budget: req.body.budget,
      });
      console.log(newAccount);
      res.status(201).json(newAccount);
    } catch (err) {
      next(err);
    }
  }
);

router.put(
  "/:id",
  checkAccountId,
  checkAccountPayload,
  async (req, res, next) => {
    try {
      const updatedAccount = await Account.updateById(req.params.id, req.body);
      res.status(200).json(updatedAccount);
    } catch (err) {
      next(err);
    }
  }
);

router.delete("/:id", checkAccountId, async (req, res, next) => {
  try {
    const deletedAccount = await Account.deleteById(req.params.id);
    res.json(deletedAccount);
  } catch (err) {
    next(err);
  }
});

router.use((err, req, res) => {
  // eslint-disable-line
  res.status(500).json({ message: err.message, stack: err.stack });
});

module.exports = router;
