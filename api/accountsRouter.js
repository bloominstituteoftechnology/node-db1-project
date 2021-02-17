const express = require("express");

const Accounts = require("./accountsModel");

const router = express.Router();


const validateId = async (req, res, next) => {
    const { id } = req.params;
    try {
        const data = await Accounts.getById(id);
        if(!data) {
            res.status(404).json({message: `Account with Id: ${id} not found`});
        }
        next();
    } catch(err) {
        res.status(404).json({message: err.message});
    }
};

const validatePost = (req, res, next) => {
    const { name, budget } = req.body;
    if(!name || !budget) {
        res.status(400).json({message: "name and budget required"});
    } else {
        next();
    }
};

router.get("/", async (req, res) => {
    try {
        const data = await Accounts.get();
        res.status(200).json(data);
    } catch(err) {
        res.status(404).json({message: err.message});
    }
});

router.get("/:id", validateId, async (req, res) => {
    const { id } = req.params;
    try {
        const data = await Accounts.getById(id);
        res.status(200).json(data);
    } catch(err) {
        res.status(404).json({message: err.message});
    }
});

router.post("/", validatePost, async (req, res) => {
    try {
        const data = await Accounts.create();
        res.status(201).json(data);
    } catch(err) {
        res.status(404).json({message: err.message});
    }
});

router.put("/:id", validateId, validatePost, async (req, res) => {
    const { id } = req.params;
    try {
        const data = await Accounts.update(id, req.body);
        res.status(200).json(data);
    } catch(err) {
        res.status(404).json({message: err.message});
    }
});

router.delete("/:id", validateId, async (req, res) => {
    const { id } = req.params;
    try {
        const data = await Accounts.remove(id);
        res.status(200).json(data);
    } catch(err) {
        res.status(404).json({message: err.message});
    }
});


module.exports = router;