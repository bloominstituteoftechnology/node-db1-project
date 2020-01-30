const express = require('express');
const db = require('../data/dbConfig');

const router = express.Router();

router.get('/', async (req, res) => {
    try{
        const accounts = await db('accounts');
        res.json(accounts);
    }catch(err){
        res.status(500).json({message: 'failed to get accounts'})
    }
})

router.get('/:id', async (req, res) => {
    const {id} = req.params;
    try{
        const accounts = await db('accounts').where('id', id)
        res.json(accounts);
    }catch(err){
        res.status(500).json({message:'failed to get account id'})
    }
})

router.post('/add', async (req, res) => {
    const bodyData = req.body;
    try{
        const accounts = await db('accounts').insert(bodyData);
        res.status(201).json(accounts);
    }catch(err){
        res.status(500).json({message: 'failed to post account'})
    }
})

router.put('/:id', async (req, res) => {
    const {id} = req.params;
    try{
        const accounts = await db('accounts').where('id', id).update(req.body);
        res.status(200).json(accounts);
    }catch(err){
        res.status(404).json({message: 'failed to find id'})
    }
})

router.delete('/:id', async (req, res) => {
    const {id} = req.params;
    try{
        const accounts = await db('accounts').where('id', id).delete(id);
        res.status(204).json(accounts);
    }catch(err){
        res.status(404).json({message: 'failed to find id'})
    }
})



module.exports = router;