const router = require("express").Router();
const Accounts = require("./accounts-model.js");
const {
  checkAccountId,
  checkAccountPayload,
  checkAccountNameUnique,
} = require("./accounts-middleware");

router.get("/", async (req, res, next) => {
  try {
    const allAccounts = await Accounts.getAll();
    res.status(200).json(allAccounts);
  } catch (err) {
    next(err);
  }
});

router.get("/:id", checkAccountId, (req, res, next) => {
  res.status(200).json(req.account);
});

router.post(
  "/",
  checkAccountPayload,
  checkAccountNameUnique,
  async (req, res, next) => {
    const { name, budget } = req.body;
    req.body.name = name.trim();
    try {
      const newAccount = await Accounts.create(req.body);
      res.status(201).json(newAccount[0]);
    } catch (err) {
      next(err);
    }
  }
);

router.put(
  "/:id",
  checkAccountId,
  checkAccountPayload,
  checkAccountNameUnique,
  async (req, res, next) => {
    const { id } = req.params;
    try {
      const updatedAccount = await Accounts.updateById(id, req.body);
      res.status(200).json(updatedAccount[0]);
    } catch (err) {
      next(err);
    }
  }
);

router.delete("/:id", checkAccountId, async (req, res, next) => {
  const { id } = req.params;
  try {
    const response = await Accounts.deleteById(id);
    res.status(200).json(response);
  } catch (err) {
    next(err);
  }
});

router.use((err, req, res, next) => {
  res.status(err.status || 500).json({
    message: err.message,
  });
});

module.exports = router;
