const express = require('express')

 const db = require('../data/dbConfig')

 const router = express.Router();


 router.get("/", (req,res)=>{
    db.select().from('accounts')
    .then(account=>{
        res.json(account)
    })
    .catch(err=>{
        res.status(500).json({message:"error", err})
    })
})





 module.exports = router;