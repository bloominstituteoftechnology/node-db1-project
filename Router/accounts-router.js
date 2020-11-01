const { Router } = require('express');
const express = require('express'); //import express

const db = require('../data/dbConfig') //import data

const router = express.Router(); //setup Router

//CRUD BELOW >>>

// function bodyCheck(req, res, next) {
//   if (req.body.name && req.body.budget) {
//     next();
//   } else {
//     res.status(400).json({ message: "Please include the required fields!" });
//   }
// }



//GET REQUESTS---------------------------------//

//GET ALL

router.get('/', (req, res) => {
  db
  //db selection
  .then((resp) => {
    res.status(200).json({ data: resp })
  })
  .catch((err) => {
    res.status(500).json({ error: err.message })
  })

})

//GET AT ID

router.get('/:id', (req, res) => {
  db
  //db selection
  .then((resp) => {
    res.status(200).json({ data: resp })
  })
  .catch((err) => {
    res.status(500).json({ error: err.message })
  })
})


//POST REQUEST---------------------------------//

router.post('/', (req, res) => {
  db
  //db selection
  .then((resp) => {
    res.status(200).json({ data: resp })
  })
  .catch((err) => {
    res.status(500).json({ error: err.message })
  })
});


//PUT REQUESTS---------------------------------//

router.put('/:id', (req, res) => {
  db
  //db selection
  .then((resp) => {
    res.status(200).json({ data: resp })
  })
  .catch((err) => {
    res.status(500).json({ error: err.message })
  })
});


//DELETE REQUESTS---------------------------------//

router.delete('/:id', (req, res) => {
  db
  //db selection
  .then((resp) => {
    res.status(200).json({ data: resp })
  })
  .catch((err) => {
    res.status(500).json({ error: err.message })
  })
});


module.exports = router;