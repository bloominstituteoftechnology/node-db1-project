const express = require("express");
const db = require("../data/dbConfig");
const { where, first } = require("../data/dbConfig");

const router = express.Router();

router.get("/", async (req, res, next) => {
  
    try {
        const accounts = await db.select("*").from("accounts");
        res.json(accounts);
    }
    catch(err){
        next(err);
    }
});

router.post("/", async (req, res, next) => {
    
    try {
        const [id] = await db
            .insert({
                name: req.body.name,
                budget: req.body.budget
            })
            .into("accounts");
    
        const account = await db("accounts")
            .where("id", id)
            .first()

        res.status(202).json(account)
    }
    catch(err){
        next(err);
    }
});

router.put("/:id", async(req, res, next) => {
    try{
        await db("accounts")
            .update({
                name: req.body.name,
                budget: req.body.budget,
            })
            .where("id", req.params.id)

        const account = await db("accounts")
            .where("id", req.params.id)
            .first()
            
        res.json(account);    
    }
    catch(err){
        next(err)
    }
});

router.delete("/:id", async (req, res, next) => {
    try{
        await db("accounts")
            .where("id", req.params.id)
            .del()
            .then((count) => {
                if (count > 0) {
                  res.status(200).json({
                    message: "Account has been deleted",
                  })
                } else {
                  res.status(404).json({
                    message: "The account could not be found",
                  })
                }
              })
    }
    catch{err}{
        next(err)
    }
})

module.exports = router;