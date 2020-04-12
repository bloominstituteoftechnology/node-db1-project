const express=require('express')

const db=require('../data/dbConfig')

const router=express.Router();

router.get("/", (req,res)=>{
    db.select().from('accounts')
    .then(account=>{
        res.json(account)
    })
    .catch(err=>{
        res.status(500).json({message:"error", err})
    })
})

router.get('/:id', (req,res)=>{
    db('accounts')
    .where({id:req.params.id})
    .first()
    .then(post=>{
        if(post){
            res.status(200).json({data:post})
        }else{
            res.status(400).json({message:"Post not found"})
        }
    })
    .catch(error=>{
        res.status(500).json({message:"Error"})
    })
})

router.post("/", (req,res )=>{
    const postData=req.body;
    db("accounts")
    .insert(postData)
    .then(post=>{
        res.status(201).json(post)
    })
    .catch(err=>{
        res.status(500).json({message: "cannot create"})
    })
})

router.put("/:id", (req,res)=>{
    const {id}=req.params
    const changes=req.body

    db("accounts")
    .where({id})
    .update(changes)
    .then(count=>{
        if(count){
            res.json({updated:count})
        }else{
            res.status(200).json(count)
        }
    })
    .catch(err=>{
        res.status(500).json({message: "cannot update "})
    })

})

router.delete("/:id", (req,res)=>{
    const {id}= req.params
    db("accounts")
    .where ({id})
    .del({id})
    .then(deleted=>{
        res.status(200).json(deleted
        )
    })
    .catch(
        err=>{
            res.status(500).json({message: "cannot delete"})
        }
    )
})



module.exports=router;