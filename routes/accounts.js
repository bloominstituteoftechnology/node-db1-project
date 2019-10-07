const router = require('express').Router();
const db = require('../data/dbConfig');

//
//Get
router.get('/', (req, res) => {
    db.select()
        .table('budgets')
        .then(data => res.send(data));
});

module.exports = router;
