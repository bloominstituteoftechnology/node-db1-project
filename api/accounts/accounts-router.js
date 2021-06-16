const router = require("express").Router();
const { checkAccountId } = require("./accounts-middleware.js");
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

router.post("/", (req, res, next) => {
  // DO YOUR MAGIC
});

router.put("/:id", (req, res, next) => {
  // DO YOUR MAGIC
});

router.delete("/:id", (req, res, next) => {
  // DO YOUR MAGIC
});

router.use((err, req, res, next) => {
  // eslint-disable-line
  res.status(500).json({ message: err.message, stack: err.stack });
});

module.exports = router;
