const express = require("express");

// DB access using knex. connection to database
const db = require("../data/dbConfig.js"); 
const db1 = require("./account-model.js")

// get the router
const router = express.Router();

router.get("/",(req, res) => {
    db1.find()
    // db("accounts") 1.
    //    db.select('*') 2.
    //      .from('accounts') 
      .then( post => {
         res.status(200).json(post)
      })
})


router.get("/:id",(req, res) => {
    const { id } = req.params
    db1.findById(id)
    // db("accounts") 
    //   .where({id: req.params.id})
    //   .first()
      .then( post => {
        if(post){
            res.status(200).json({ data: post});
        }else{
            res.status(404).json({ message: 'post not find'});
        }
        
    })
    .catch( err => {
        res.status(500).json({ msg: "sorry ran into an error"})
    })
})

router.post("/",(req,res) =>{
    db("accounts")
       .insert(req.body, "id")
       .then( ids => {
           res.status(201).json({ ID: ids })
       })
       .catch( err => {
           res.status(500).json({msg: "No new data added" })
       })
});

router.put("./:id",(req,res) =>{
    const changes = req.body;

    db("accounts")
    .where({id: req.params.id })
    .update(changes)
    .then((count) => {
        if ( count > 0 ) {
            // If you can't update the record, it's going to return 0 - falsy - don't rely on it.
            res.status(200).json({msg:"updated successfully"})
        }else{
            res.status(400).json({msg:"Not updated"})
        }
    })
    .catch((error) => {
        res.status(500).json({ message: "Sorry, ran into an error" }); // Always catch it.
      });
})

router.delete("/:id",(req,res) => {
    db("accounts")
      .where({ id: req.params.id})
      .del() //deletes record
      .then((count) => {
        // If you can't find the record, it's going to return 0 - falsy - don't rely on it.  
        if( count > 0 ){
          res.status(200).json({msg:"deleted successfullu"})
        }else{
            res.status(400).json({msg:"Not Found" })
        }
      })
      .catch(error => {
        res.status(500).json({ message: "Sorry, ran into an error" }); // Always catch it. 
      })
})

// .then(account => { // I will get a collection/array back because it's relational db
//       if (account) {
//         res.status(200).json({ data: account }); // returns an obj instead of an array - Worked on Postman
//       } else {
//         res.status(404).json({ message: "Account Not Found" }); // always show the right message
//       }
//     })

module.exports = router;