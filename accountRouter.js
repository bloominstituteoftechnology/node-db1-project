const express = require('express');

const router = express.Router();

const db = require('./data/dbConfig');

router.get('/', (req, res) => {
    db.select('*').from('accounts')
    .then( acc => 
    res.status(200).json({data: acc})
    )
    .catch(
        err => console.log(err)
    )
})



module.exports = router;