const router = require('express').Router();
const db = require('../data/dbConfig');

//
//Get
router.get('/', async (req, res) => {
    let accounts = await db('accounts');
    if (!accounts || accounts == null) {
        res.status(500).json({ error: 'There was an error' });
    }
    console.log(accounts);
    res.json(accounts);
});

//
//Post
router.post('/', async (req, res) => {
    let inserted = await db('accounts').insert(({ name, budget } = req.body));
    if (!inserted || inserted == null) {
        res.status(500).json({ error: 'Failed to save account' });
    }
    res.status(200).json({
        message: 'Successfully saved account',
        account: inserted,
    });
});

module.exports = router;
