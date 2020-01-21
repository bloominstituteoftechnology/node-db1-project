const router = require("express").Router();

const db = require("../data/dbConfig.js");

router.get("/", (req, res) => {
    db("accounts")
        .then(accounts => {
            res.status(200).json(accounts);
        })

    .catch(() => {
        res

            .status(500)

        .json({ message: "Could not retrieve the list of accounts" });
    });
});

router.get("/:id", (req, res) => {
    db("accounts")
        .where({ id: req.params.id })

    .then(account => {
        if (account) {
            res.status(200).json(account);
        } else {
            res.status(404).json({ message: "Account not found" });
        }
    });
});

router.post("/", (req, res) => {
    if (req.body) {
        db("accounts")
            .insert(req.body, "id")

        .then(([id]) => id)

        .then(id => {
            db("accounts")
                .where({ id })

            .then(account => {
                res.status(201).json(account);
            });
        })

        .catch(() => {
            res.status(500).json({ message: "Could not add the account" });
        });
    } else {
        res.status(400).json({
            message: "Please provide name and budget of zero or more for the account"
        });
    }
});

router.put("/:id", (req, res) => {
    db("accounts")
        .where({ id: req.params.id })

    .update(req.body)

    .then(count => {
        if (count) {
            res.status(200).json({ message: `${count} record(s) updated` });
        } else {
            res.status(404).json({ message: "Account not found" });
        }
    })

    .catch(() => {
        res.status(500).json({ message: "Could not update the account" });
    });
});

router.delete("/:id", (req, res) => {
    db("accounts")
        .where({ id: req.params.id })

    .del()

    .then(count => {
        res.status(200).json({ message: `${count} record(s) deleted` });
    })

    .catch(() => {
        res.status(500).json({ message: "Could not remove the account" });
    });
});

module.exports = router;