const express = require ('express');

const db = require ('../data/dbConfig.js');

const router = express.Router()



router.get ('/', (req, res)=> {

    db .select ('*')
        .from ('accounts')
        .then(accounts => {
            res.status(200) .json(accounts);
        })

        .catch(error => {
            console.log(error);
            res.status(500).json({ errorMessage: "sorry cannot retrieve account"})
        })


});

router.post ('/add', (req, res)=> {
const accountInfo = req.body;
db ('accounts')
    .insert(accountInfo, 'id')
    .then(accounts => {
        res.status(200). json(accounts);
    })
    .catch(error => {
        console.log(error);
        res.status(500).json({ errorMessage: 'sorry cannot write post'});
    })
});

router.put ('/:id', (req, res)=> {
const {id } = req.params;
const changes = req.body;
db('accounts')

    .where ({ id })
    .update(changes)
    .then(accounts => {
        res.status(200).json({message: `${accounts} has been updated we did it! yay!`});
    })

    .catch(error => {
        console.log(error);
        res.status(500).json({errorMessage: 'sorry unable to edit post.'})
    });
});

router.delete ('/:id', (req, res)=> {

db('accounts')

    .where ({ id: req.params.id})
    .del ()
    .then(account => {
        res.status(200).json ({ message: `you lost account number ${account}!!!`})
    })

    .catch(error => {
        console.log(error);
        res.status(500).json ({errorMessage: "nope, didn't work"})
    })
});

module.exports = router;