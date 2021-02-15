const express = require("express");
const router = express.Router();
const Accounts = require("./accounts-model.js");

router.get("/", async (req, res, next) => {
    try {
        const data = await Accounts.getAll();
        res.status(200).json(data);
    } catch (e) {
        next(e);
    }
});

router.get("/:id", async (req, res, next) => {
    const {id} = req.params;
    try {
        const account = await Accounts.getByID(id)
        res.status(200).json(account);
    } catch (e) {
        next(e);
    }
});

router.post("/", async (req, res, next) => {
    try {
        const data = await Accounts.create(body);
        res.status(201).json(data);
    } catch (e) {
        next(e);
    }
});

router.put("/:id", async (req, res, next) => {
    const { id } = req.params;
    const changes = req.body;
    try {
        const data = await Accounts.update(id, changes);
        res.status(200).json({ count: data });
    } catch (e) {
        next(e);
    }
});

router.delete("/:id", async (req, res, next) => {
    const { id } = req.params;
    try {
        const data = await Accounts.remove(id);
        res.status(200).json({ count: data });
    } catch (e) {
        next(e);
    }
});

router.use((err, req, res, next) => {
    res.status(500).json({ message: err.message });
});

module.exports = router
