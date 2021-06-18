const router = require("express").Router();

const accounts = require("./accounts-model.js");
const {
  checkAccountPayload,
  checkAccountId,
  checkAccountNameUnique,
} = require("./accounts-middleware.js");

router.get("/", async (req, res, next) => {
  // DO YOUR MAGIC
  try {
    const accountsList = await accounts.getAll();
    res.status(200).json(accountsList);
  } catch (err) {
    next(err);
  }
});

router.get("/:id", checkAccountId, (req, res) => {
  // DO YOUR MAGIC
  res.status(200).json(req.account);
});

router.post(
  "/",
  checkAccountPayload,
  checkAccountNameUnique,
  async (req, res, next) => {
    // DO YOUR MAGIC
    try {
      const payload = {
        name: req.body.name.trim(),
        budget: req.body.budget,
      };
      const newAccount = await accounts.create(payload);
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
    // DO YOUR MAGIC
    try {
      const payload = {
        name: req.body.name,
        budget: req.body.budget,
      };

      await accounts.updateById(req.params.id, payload);
      const updatedAccount = await accounts.getById(req.params.id);

      res.json(updatedAccount);
    } catch (err) {
      next(err);
    }
  }
);

router.delete("/:id", checkAccountId, async (req, res, next) => {
  // DO YOUR MAGIC
  try {
    const deletedAccount = await accounts.getById(req.params.id);
    await accounts.deleteById(req.params.id);
    res.status(200).json(deletedAccount);
  } catch (err) {
    next(err);
  }
});

router.use((err, req, res, next) => { // eslint-disable-line
  // DO YOUR MAGIC
  console.log(err);

  res.status(500).json({
    message: "Something went wrong with the request",
  });
});

module.exports = router;
