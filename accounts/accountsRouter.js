const express = require("express")

const db = require("../data/dbConfig.js");

const router = express.Router();

router.get('/', (req, res) => {
    db.select("*")
        .from("accounts")
        .then(accounts => {
            res.status(200).json({data: accounts})
        })
        .catch(err => {
            res.status(500).json({message: 'could not get accounts'})
        })
})

router.get('/:id', (req, res) => {
    const {id} = req.params;

    db.select("*")
        .from("accounts")
        .where({ id })
        .first()
        .then(account => {
            res.status(200).json({data: account})

        })
        .catch(err => {
            res.status(500).json({message: 'could not get account with specified ID'})
        })
})

router.post('/', (req, res) => {
    const accountData = req.body;

    db("accounts")
        .insert(accountData, "id")
        .then(ids => {
            db("accounts")
                .where({id: ids[0]})
                .first()
                .then( account => {
                    res.status(200).json({data: account})
                })
        })
        .catch(err => {
            res.status(500).json({message: 'could not post account'})
        })
})


router.put('/:id', (req, res) => {
    const { id } = req.params;
    const changes = req.body;

    db("accounts")
        .where({id})
        .update(changes)
        .then(count => {
            if (count > 0) {
                res.status(200).json({data: count})
            } else {
                res.status(404).json({message: "there was no record to update"})
            }
        })
        .catch(err => {
            res.status(500).json({message: 'could not update account'})
        })
})

router.delete('/:id', (req, res) => {
    const {id} = req.params;

    db("accounts")
        .where({id})
        .del()
        .then(count => {
            if(count > 0){
                res.status(204).json({data: count})
            } else {
                res.status(404).json({message:"there was no record to delete"})
            }
        })
        .catch(err => {
            res.status(500).json({message: "record could not be deleted"})
        })
})
