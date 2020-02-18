const express = require('express');

const db = require('../dbConfig.js')
const router = express.Router();

//Get Routes
router.get("/", (req, res) => {
    console.log(req.query)
    // list of posts
    // select from posts
    // all database operations return a promise
    db.select("*")
      .from("accounts").limit(req.query.limit)
      .then(posts => {
        res.status(200).json(posts);
      })
      .catch(error => {
        console.log(error);
  
        res.status(500).json({ error: "failed to get the list of posts" });
      });
  });
  
router.get("/:id", (req, res) => {
// a post by it's id
// select * from posts where id = :id
    getById(req.params.id)
    .then(account => {
    res.status(200).json(account);
    })
    .catch(error => {
    console.log(error);

    res.status(500).json({ error: "failed to get the post" });
    });
});

//Post Routes
router.post("/", (req, res) => {
// add a post
// insert into posts () values ()
db("accounts")
    .insert(req.body, "id") // will generate a warning on console when using sqlite, ignore that
    .then(ids => {
    return getById(ids[0]).then(inserted => {
        res.status(201).json(inserted);
    });
    })
    .catch(error => {
    console.log(error);

    res.status(500).json({ error: "failed to add the post" });
    });
});

//Put Routes
router.put("/:id", (req, res) => {
// update a post
const id = req.params.id;
const changes = req.body;
db("accounts")
    .where({ id }) // remember to filter or all records will be updated (BAD PANDA!!)
    .update(changes) 
    .then(count => {
    res.status(200).json(count);
    })
    .catch(error => {
    console.log(error);

    res.status(500).json({ error: "failed to update the post" });
    });
});

//Delete Routes
router.delete("/:id", (req, res) => {
// removes a post
const id = req.params.id;
db("accounts")
    .where({ id }) // remember to filter or all records will be deleted (BAD PANDA!!)
    .del()
    .then(count => {
    res.status(200).json(count);
    })
    .catch(error => {
    console.log(error);

    res.status(500).json({ error: "failed to remove the post" });
    });
});


module.exports = router;

function getById(id) {
    return db("accounts")
      .where({ id })
      .first();
  }