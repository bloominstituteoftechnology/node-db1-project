const express = require('express')

const Accounts = require('./accounts-model.js')

const router = express.Router()

router.get('/', async (req,res,next) => {
    try {
        const data = await Accounts.get()
        res.status(200).json(data)
    } catch (err) {
        next(err)
    }
});

router.get('./:id', async (req,res,next) => {
    try{
        res.status(200).json(req.accounts);
    } catch (err) {
        next(err)
    }
})

router.post('/', async (req,res,next) => {
    try{
        const data = await Accounts.create(body);
        res.json(data)
    } catch (err) {
        next(err)
    }
})

router.put('/:id', async (req,res,next) => {
    const {id} = req.params;
    const changes = req.body;
    try{
        const data = await Accounts.update(id, changes)
        res.json({count: data});
    } catch (err) {
        next(err)
    }
})


router.delete('/:id', async (req,res,next) => {
    const {id} = req.params;
    try {
        const data = await Accounts.remove(id)
        res.json({count: data});
    } catch (err){
        next(err)
    }
})




router.use((err,req,res,next) => {
    err.statusCode = err.statusCode ? err.statusCode : 500;
    res.status(err.statusCode).json({message: err.message, stack: err.stack})
})

module.exports = router;