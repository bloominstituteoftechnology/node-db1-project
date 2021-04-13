const router = require("express").Router();
const Accounts = require("./accounts-model");
const {
  checkAccountPayload,
  checkAccountNameUnique,
  checkAccountId,
} = require("./accounts-middleware");

router.get("/", (req, res, next) => {
  Accounts.getAll()
    .then((accounts) => res.status(200).json(accounts))
    .catch((err) => next(err));
});

router.get("/:id", checkAccountId, (req, res) => {
  res.status(200).json(req.account);
});

router.post(
  "/",
  checkAccountPayload,
  checkAccountNameUnique,
  (req, res, next) => {
    req.body.name = req.body.name.trim();
    Accounts.create(req.body)
      .then((newAccount) => res.status(201).json(newAccount))
      .catch((err) => next(err));
  }
);

router.put(
  "/:id",
  checkAccountPayload,
  checkAccountNameUnique,
  checkAccountId,
  (req, res, next) => {
    const id = req.params.id;
    req.body.name = req.body.name.trim();
    Accounts.updateById(id, req.body)
      .then((updatedAccount) => res.status(200).json(updatedAccount))
      .catch((err) => next(err));
  }
);

router.delete("/:id", checkAccountId, (req, res, next) => {
  const id = req.params.id;
  Accounts.deleteById(id)
    .then((deletedAccount) => res.status(200).json(deletedAccount))
    .catch((err) => next(err));
});

router.use((err, req, res, next) => {
  res.status(500).json({ message: err.message, stack: err.stack });
});

module.exports = router;
