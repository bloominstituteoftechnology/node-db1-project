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
    
}); 

router.put("/:id", (req, res) => {

}); 

router.delete("/:id", (req, res) => {

})

module.exports = router; 

