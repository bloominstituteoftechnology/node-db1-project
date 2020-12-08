const express = require("express");
const { update } = require("../../data/dbConfig");
const router = express.Router();
const Customer = require("./customer-model");

router.get("/accounts", async (req, res) => {
  try {
    const accounts = await Customer.getAll();

    res.status(200).send(accounts);
  } catch (e) {
    res.status(500).send(e);
  }
});

const validateName = async (req, res, next) => {
  try {
    const { name, budget } = req.body;

    if (!name || !budget) return res.status(400).send({ e: "Please provide a name" });

    const doesExist = await Customer.getByName(name);

    if(doesExist) return res.status(400).send({e: "Name already chosen. Please choose another."})


    return next(); 
  } catch (e) {
    res.status(500).send(e);
  }
};

router.post("/accounts", validateName, async (req, res) => {
  try {
      const { name, budget } = req.body; 

      const newCustomer = {name, budget}; 

      const newAccount = await Customer.create(newCustomer); 
      return res.status(200).send(newAccount); 
  }
  catch(e){
      res.status(500).send(e); 
  }
});


router.put("/accounts/:id", async (req, res) => {
    
    try {
        const { id } = req.params; 
        const changes = req.body; 
        await Customer.update(id, changes); 
        const updated = await Customer.getById(id); 
        res.json(updated); 
    }
    catch(e){
        res.status(500).send(e); 
    }

})

router.delete("/accounts/:id", async (req, res) => {

    try {
        const id = req.params.id; 
        await Customer.delete(id); 

        res.status(200).send({message: "Delete successful"}); 
        
    }
    catch(e){
            res.status(500).send(); 
    }
})

module.exports = router;
