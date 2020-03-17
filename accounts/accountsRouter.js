const router = require("express").Router();

const db = require("../data/dbConfig.js");

router.get("/", (req, res) => {
  db("accounts")
    .then(accounts => {
      res.status(200).json(accounts);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ error: "could not retrieve the accounts" });
    });
});

router.get("/:id", (req, res) => {
  db("accounts")
    .where({ id: req.params.id })
    .first()
    .then(account => {
      account
        ? res.status(200).json(account)
        : res.status(404).json({ error: "ACcount is not found" });
    });
});

router.post("/", (req, res) => {
  // need to validate if expected information is present
  // expected name, budget
  name = req.body.name;
  budget = req.body.budget;

  name && typeof budget === 'number' && budget > 0
    ? db("accounts")
        .insert(req.body, "id")
        .then(id => {
          db("accounts")
            .where({ id })
            .first()
            .then(account => {
              res.status(201).json(account);
            });
        })
        .catch(err => {
          console.log(err);
          res.status(500).json({ error: "Could not add account" });
        })
    : res.status(400).json({ 
        error: "Please provide name and budget for every account" 
    });
});

router.put('/:id', (req, res) => {
    db('accounts')
        .where({ id: req.params.id })
        .update(req.body)
        .then(count => {
            count
            ? res.status(200).json( {message: `${count} records updated` })
            : res.status(404).json({ error: "Account not found" })
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({ error: "Cannot update the account" })
        })
});

router.delete('/:id', (req, res) => {
    db('accounts')
    .where({ id: req.params.id })
    .del()
    .then(count => {
        count
        ? res.status(200).json({ message: `${count} records deleted` })
        : res.status(404).json(404).json({error: `Cannot find account by ${id}`})
    })
    .catch(err => {
        console.log(err)
        res.status(500).json({ message: "Could not remove account" })
    })
});



module.exports = router;