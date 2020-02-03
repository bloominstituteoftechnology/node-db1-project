const express = require("express")

const db = require("../data/dbConfig.js")

const router = express.Router()



/************************/
/******** CREATE ********/
/************************/

router.post('/', async (req, res, next) => {
    try {
        const payload = {
            name: req.body.name,
            budget: req.body.budget
        }

        const [id] = await db("accounts")
            .insert(payload)

        res.json(await db("accounts")
            .where("id", id)
            .first())

    } catch (err) {
        next(err)
    }
})



/**********************/
/******** READ ********/
/**********************/

router.get('/', async (req, res, next) => {
    try {
        res.json(await db
            .select("*")
            .from("accounts"))

    } catch (err) {
        next(err)
    }
})


router.get('/:id', async (req, res, next) => {
    try {
        res.json(await db
            .select("*")
            .from("accounts")
            .where("id", req.params.id))

    } catch (err) {
        next(err)
    }
})



/************************/
/******** UPDATE ********/
/************************/

router.put('/:id', async (req, res, next) => {
    try {
        const payload = {
            name: req.body.name,
            budget: req.body.budget
        }

        await db("accounts")
            .where("id", req.params.id)
            .update(payload)

        res.json(await db("accounts")
            .where("id", req.params.id)
            .first())

    } catch (err) {
        next(err)
    }
})



/************************/
/******** DELETE ********/
/************************/

router.delete('/:id', async (req, res, next) => {
    try {
        await db("accounts")
            .where("id", req.params.id)
            .del()

        res.status(204)
            .end()
            
    } catch (err) {
        next(err)
    }
})

module.exports = router