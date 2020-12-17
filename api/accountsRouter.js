const express= require('express');
const db=require('../data/dbConfig');
const router=express.Router();

router.get('/', async (req,res,next)=>{
    try{
        const accounts= await db
        .select("*")
        .from("accounts")
        res.json(accounts)
    }catch(err){
        next(err)
    }
})

router.get('/:id', async (req,res,next)=>{
    try{
        const account= await db
        .select("*")
        .from("accounts")
        .where("id",req.params.id)
        res.json(account)
    }catch(err){next(err)}
})

router.post('/', async (req,res,next)=>{
    try{
        const payload={
            name: req.body.name,
            budget: req.body.budget
        }
        const [id]=await db
        .insert(payload)
        .into("accounts")
        const accounts=await db("accounts").first().where("id",id)
        res.status(201).json(accounts)
    }catch(err){next(err)}
})

router.put('/:id', async (req,res,next)=>{
    try{
        const payload={
            name: req.body.name,
            budget: req.body.budget
        }
        await db("accounts").where("id",req.params.id).update(payload)
        const updatedAccount= await db("accounts").where("id",req.params.id).first()
        res.json(updatedAccount)
    }catch(err){next(err)}
})

router.delete('/:id', async (req,res,next)=>{
    try{
            await db("accounts").where("id",req.params.id).del()
            res.status(200).json({message:"The account has been deleted."})
    }catch(err){next(err)}
})

module.exports=router