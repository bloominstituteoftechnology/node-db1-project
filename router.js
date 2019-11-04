// setting router to router method from express and importing dbConfig file as knex
const router = require('express').Router();
const knex = require('./data/dbConfig');

//
// CRUD
//

// *** GET FUNCTIONS
// get all accounts
router.get('/', (req, res) => {
    knex('accounts') // same thing as db.select('*').from('accounts')
    // as per usual, promise stuff
    .then(accounts => {
        res.status(200).json(accounts);
    })
    .catch(err => res.status(500).json({ error: err })); 
})
//get by id
router.get('/:id', validateAccountId, (req, res) => {
    const id = req.params.id;
    knex('accounts')
    .where({ id: id })
    .then(account => {
        res.status(200).json(account);
    })
    .catch(err => res.status(500).json({ error: err }));
})

// *** POST FUNCTIONS
router.post('/', validateAccount, (req, res) => {
    const account = req.body;
    knex('accounts')
    .insert(account)
    .then(response => {
        res.status(201).json(`Post created with id ${response}.`);
    })
    .catch(err => res.status(500).json({ error: err }));
})

// *** DELETE FUNCTIONS
router.delete('/:id', validateAccountId, (req, res) => {
    const id = req.params.id;
    knex('accounts')
    .where({ id: id })
    .del()
    .then(count => {
        res.status(200).json(`${count} record deleted.`);
    })
    .catch(err => res.status(500).json({ error: err }));
})

// *** UPDATE FUNCTIONS
router.put('/:id', validateAccountId, validateAccount, (req, res) => {
    const id = req.params.id;
    const update = req.body;
    knex('accounts')
    .where({ id: id })
    .update(update)
    .then(count => {
        res.status(200).json(`${count} record updated.`);
    })
    .catch(err => res.status(500).json({ error: err }));
})

//
// MIDDLEWARE
//
function validateAccountId(req, res, next) {
    const id = req.params.id;
    knex('accounts')
    .where({ id: id })
    .then(account => {
        !account.length && res.status(404).json({ error: "Account with provided id not found." });
        next();
    })
    .catch(err => res.status(500).json({ error: err }));
}

function validateAccount(req, res, next) {
    const account = req.body;
    !account && res.status(400).json({ error: "Please provide an account." });
    !account.name && res.status(400).json({ error: "Please provide an account name." });
    !account.budget && res.status(400).json({ error: "Please provide an account budget." });
    next();
}

// export router
module.exports = router;