const router = require("express").Router();
const Accounts = require("./accounts-model");
const {
  checkAccountId,
  checkAccountPayload,
  checkAccountNameUnique,
} = require("./accounts-middleware");

router.get("/", (req, res, next) => {
  // DO YOUR MAGIC
  Accounts.getAll()
    .then((account) => {
      res.json(account);
    })
    .catch((err) => {
      next(err);
    });
});

router.get("/:id", checkAccountId, (req, res, next) => {
  // DO YOUR MAGIC
  Accounts.getById(req.params.id).then((account) => {
    res.json(account);
  });
});

router.post(
  "/",
  checkAccountPayload,
  checkAccountNameUnique,
  (req, res, next) => {
    // DO YOUR MAGIC
    const { name, budget } = req.body;
    Accounts.create({
      name: name.trim(),
      budget: budget,
    })
      .then((newAccount) => {
        res.status(201).json(newAccount);
      })
      .catch((err) => {
        next();
      });
  }
);

router.put("/:id", checkAccountId, checkAccountPayload, (req, res, next) => {
  // DO YOUR MAGIC
  Accounts.updateById(req.params.id, req.body)
    .then((updatedAccount) => {
      res.status(200).json(updatedAccount);
    })
    .catch((err) => {
      next(err);
    });
});

router.delete("/:id", checkAccountId, (req, res, next) => {
  // DO YOUR MAGIC
  Accounts.deleteById(req.params.id)
    .then((removedAccount) => {
      res.json(removedAccount);
    })
    .catch((err) => {
      next(err);
    });
});

router.use((err, req, res, next) => {
  // eslint-disable-line
  // DO YOUR MAGIC
});

module.exports = router;
