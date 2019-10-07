const express = require("express"); 

const db = require("./data/dbConfig.js"); 

const router = express.Router(); 

router.get("/", (req, res) => {
    db.select("*")
        .from("accounts")
        .then(get => {
            res.status(200).json(get)
        })
        .catch(error => {
            console.log("error from get router ", error)
            res.status(500).json({error:"Something Went Wrong"})
        })
}); 


router.post("/", (req, res) => {
    const data = req.body; 

    db.select("*")
    .from("accounts")
    .insert(data, "id")
    .then(post => {
        res.status(200).json(post)
    })
    .catch(error => {
        console.log("error from post", error)
        res.status(500).json({error: "Something Went Wrong"})
    })
});

router.get("/:id", (req, res) => {
    const { id } = req.params; 

    db.select("*")
    .from("accounts")
    .where("id", "=", id)
    .then(response => {
        res.status(200).json(response)
    })
    .catch(error => {
        console.log("error from get id", error)
        res.status(500).json({error: "Something Went Wrong"})
    })
}); 

router.put("/:id", (req, res) => {
    const id  = req.params.id; 
    const body = req.body; 

    db.select("*")
    .from("accounts")
    .where({id})
    .update(body)
    .then(response => {
        res.status(200).json(response)
    })
    .catch(error => {
        console.log("error from .put() id", error)
        res.status(500).json({error: "Something Went Wrong"})
    })
}); 

router.delete("/:id", (req, res) => {
    const id =  req.params.id; 
    const body = req.body; 

    db.select("*")
    .from("accounts")
    .where({id})
    .delete(body)
    .then(response => {
        res.status(200).json(response)
    })
    .catch(error => {
        console.log("error from delete", error)
        res.status(500).json({error: "Something Went Wrong"})
    })

})

module.exports = router; 

