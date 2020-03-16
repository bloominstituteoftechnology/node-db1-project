const express = require("express");

const db = require("../data/dbConfig");

const router = express.Router();

router.get("/", (req,res) => {
    db.select("*")
        .from("accounts")
        .then( rows => {
            res.status(200).json({ data: rows});
        })
        .catch( error => {
            res.status(500).json({ message: "Sorry, there was an error."})
        })
})

router.get("/:id", (req, res) => {
    db("accounts")
    .then(account => {
        if(account){
            res.status(200).json({ data: account});
        } else {
            res.status(404).json({ message: "Post not found"});
        }
    })
    .catch ( error => {
        res.status(500).json({ message: "Sorry, there was an error."})
    })
})

router.post("/", (req,res) => {
    db("accounts")
    .insert(req.body, "id")
    .then(ids => {
        res.status(201).json({ results: ids});
    })
    .catch(error => {
        res.status(500).json({ message: "sorry, there was an error"})
    })
})

// router.put("/:id", (req,res) => {
//     const changes = req.body;
//     const {id} = req.params;
//     db("accounts")
//     .where({ id })
//     .update(changes)
//     .then(count => {
//             res.status(200).json(count);
//     })
//     .catch( error => {
//         res.status(500).json({ message: "Sorry, there was an error"});
//     });
// });

// router.put("/:id", (req, res)=>{
//     const changes=req.body
//     const {id}=req.params
//     db("accounts")
//     .where({id})
//     .update(changes)
//     .then(account=>{
//         account? res.status(200).json(account):
//         res.status(404).json({errorMessage: "Post not found "})
//     })
//     .catch(error=>{
//         res.status(500).json({
//             error:`There is an error ${error}`
//         });
//     });
// });

router.put('/:id', (req, res) => {
    db('accounts')
    .where({id: req.params.id})
    .update(req.body)
    .then(account => {
        res.status(200).json(account)
    })
    .catch(error => {
        res.status(500).json({message: 'the account could not be updated'})
    })
})

router.delete("/:id", (req, res) => {
    db("accounts")
      .where({ id: req.params.id })
      .del() // delete the records
      .then(count => {
        if (count > 0) {
          res.status(200).json({ message: "record deleted successfully" });
        } else {
          res.status(404).json({ message: "Post not found" });
        }
      })
      .catch(error => {
        res.status(500).json({ message: "sorry, ran into an error" });
      });
  });

module.exports = router; 