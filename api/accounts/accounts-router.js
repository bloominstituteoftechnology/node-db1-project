const router = require("express").Router();
const Accounts = require("./accounts-model");
const {
  checkAccountId,
  checkAccountPayload,
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
  Accounts.getById(req.params.id)
    .then((account) => {
      res.json(account);
    })
    .catch((err) => {
      next(err);
    });
});

router.post("/", (req, res, next) => {
  // DO YOUR MAGIC
  const { name, budget } = req.body;
  Accounts.create({ name: name, budget: budget })
    .then((newAccount) => {
      res.status(201).json(newAccount);
    })
    .catch((err) => {
      next(err);
    });
});

router.put("/:id", (req, res, next) => {
  // DO YOUR MAGIC
  Accounts.updateById(req.params.id)
    .then((updatedAccount) => {
      res.status(201).json(updatedAccount);
    })
    .catch((err) => {
      next(err);
    });
});

router.delete("/:id", (req, res, next) => {
  // DO YOUR MAGIC
  Accounts.deleteById(req.params.id)
    .then((account) => {
      res.status(200).json(account);
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
