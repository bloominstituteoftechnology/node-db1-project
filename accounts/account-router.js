const express = require('express');

const {
    getAllAccounts,
    getAccountById,
    newAccount,
    replaceAccountById,
    deleteAccountById
} = require('./account-model');

const router = express.Router();

router.get('/', async (req, res) => {
    try {
        const allPosts = await getAllAccounts()
        res.json(allPosts)
    } catch (e) {
        console.log(e);
    }
});

router.get('/:id', async (req, res) => {
    try {
        const postId = await getAccountById(req.params.id)
        res.json(postId)
    } catch(e) {
        console.log(e)
    }
});

router.post('/', async (req, res) => {
    try{
        const { name, budget } = req.body;
        const id = await newAccount ({ name, budget})
        res.json({
            message: `New Account with ${id} was created`
        })

    }catch (e) {
        console.log(e)
    }
});

router.put('/:id', async (req, res) => {
    const { id } = req.params;
    const {name, budget} = req.body;

    try {
        const account = await replaceAccountById({id, name, budget})
        res.json({ message: `account with id ${id} got updated`})
    } catch (e) {
        console.log(e);
    }
});

router.delete('/:id', async (req, res) => {
    const {id} = req.params;
    try {
        const account = await deleteAccountById(req.params.id)
        res.json({
            message: ` account number ${id} was deleted`
        })
    } catch (e) {
        console.log(e)
    }
})



module.exports = router