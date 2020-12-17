const express = require('express');

const db = require('../../data/dbConfig');

const router = express.Router();

// GET accounts
router.get('/', async (req, res) => {
    // QUERY STRINGS
    const sortBy = req.query.sortBy || 'id';
    const sortDir = req.query.sortDir || 'asce';
    const limit = req.query.limit || null;

    try {
        const accounts = await db.select('*').from('accounts').orderBy(sortBy, sortDir).limit(limit);
        res.status(200).json(accounts);
    } catch {
        res.status(500).json({ errorMessage: "There has been an error with the database." });
    }
});

// GET account with ID
router.get('/:id', validateAccountID(), async (req, res) => {
    try {
        res.status(200).json(req.account);
    } catch {
        res.status(500).json({ errorMessage: "There has been an error with the database." });
    }
});

// POST account
router.post('/', validateUniqueAccountName(), async (req, res) => {

    // Verify that the request body has the required fields
    if (!req.body.name || !req.body.budget) {
        return res.status(400).json({ errorMessage: "Misssing required field. Check for name and budget fields" });
    }

    try {
        const account = req.body;
        const [ id ] = await db('accounts').insert(account);

        res.status(201).json({ message: "Account has been created", id: id });
    } catch {
        res.status(500).json({ errorMessage: "There has been an error with the database." });
    }
});

// UPDATE | PUT account
router.put('/:id', validateAccountID(), async (req, res) => {
    const { id } = req.params;
    const changes = req.body;

    // Check that there is at least one field in the request body
    if (!changes.name && !changes.budget) {
        return res.status(400).json({ errorMessage: "No fields in request body." })
    }

    try {
        await db('accounts').where({ id: id }).update(changes);
        res.status(200).json({ message: "Account updated." });
    } catch {
        res.status(500).json({ errorMessage: "There has been an error with the database." });
    }

});

router.delete('/:id', validateAccountID(), async (req, res) => {
    const { id } = req.params;

    try {
        await db('accounts').where({ id: id }).del();
        res.status(200).json({ message: "Account deleted." });
    } catch {
        res.status(500).json({ errorMessage: "There has been an error with the database." });
    }
});

/* MIDDLEWARE */
function validateAccountID (req, res, next) {
    return function (req, res, next) {
        const { id } = req.params;

        db('accounts').where({ id: id })
            .then(response => {
                const [ account ] = response;

                if (!account) {
                    return res.status(404).json({ errorMessage: "No account with specified ID." })
                };

                req.account = account;
                next();
            })
            .catch(() => {
                res.status(500).json({ errorMessage: "There has been an error with the database." });
            })
    };
};

// Check that the account name is unique (not already used by another account)
function validateUniqueAccountName (req, res, next) {
    return function (req, res, next) {
        const { name } = req.body;

        db('accounts').where({ name: name })
            .then(results => {
                if (results.length >= 1) {
                    return res.status(400).json({ errorMessage: "An account already has that name." })
                }

                next();
            })
    };
}

module.exports = router;