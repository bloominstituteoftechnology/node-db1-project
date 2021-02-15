const express = require("express");
const router = express.Router();
const Account = require("./accounts-model");

router.get("/", (req, res) => {
  Account.getAccounts()
    .then((account) => {
      res.status(200).json(account);
    })
    .catch((error) => {
      res.status(500).json({ message: error.message });
    });
});

router.get("/:id", (req, res) => {
    const idVar = req.params.id
    Account.getById(idVar).then(account => {
        res.status(200).json(account)
    }).catch(error => {
        res.status(500).json({message: error.message})
    })
});

router.post("/", (req, res) => {
    const account = req.body
    Account.insert(account).then(newAcc => {
        res.status(201).json(newAcc)
    }).catch(error => {
        res.status(500).json({message: error.message})
    })
});

router.put("/:id", (req, res) => {
    const idVar = req.params.id
    const account = req.body
    Account.update(idVar, account).then(update => {
        res.status(200).json(update)
    }).catch(error => {
        res.status(500).json({message:error.message})
    })

});


router.delete("/:id", (req, res) => {
    const idVar = req.params.id
    Account.delete(idVar).then(() => {
        res.status(200).json({message: `The account at id: ${idVar} has been deleted`})
    }).catch(error => {
        res.status(500).json({message:error.message})
    })
});

module.exports = router