const { Router } = require('express');
const express = require('express'); //import express

const db = require('../data/dbConfig') //import data

const router = express.Router(); //setup Router

//CRUD BELOW >>>

function bodyCheck(req, res, next) {
  console.log(req.body);
  if (req.body.name && req.body.budget) {
    next();
  } else {
    res.status(400).json({ message: "Please include the required fields!" });
  }
}



//GET REQUESTS---------------------------------//

//GET ALL

router.get('/', (req, res) => {
  // console.log('accounts')
  db
  //db selection
  .select('*').from('accounts') //<<<<<< //WHERE IS ACCOUNTS COMING FROM
  //
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
  ('accounts')
  .where('id', '=', req.params.id) //<<<<<<
  //
  .then((resp) => {
    res.status(200).json({ data: resp })
  })
  .catch((err) => {
    res.status(500).json({ error: err.message })
  })
})


//POST REQUEST---------------------------------//

router.post('/', bodyCheck, async (req, res) => {
  const postData = req.body; //<<<<<<
  // db
  // //db selection
  // ('accounts').insert(postData, 'id') //<<<<<<
  // //
  // .then((resp) => {
  //   res.status(201).json({ data: resp })
  // })
  // .catch((err) => {
  //   res.status(500).json({ error: err.message })
  // })
  try{ 
    const results = await db('accounts').insert(postData, 'id') //<<<<
    res.status(201).json({ data: results })
  }
  catch(error) {
    res.status(500).json({ error: err.message })
  }
});




//PUT REQUESTS---------------------------------//

router.put('/:id', bodyCheck, (req, res) => {
  const changes = req.body;
  db
  //db selection
  ('accounts').where({ id: req.params.id }) //<<<<<<
  .update(changes)                          //<<<<<<
  //
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
  ('accounts').where({ id: req.params.id }) //<<<<<<
  .del()                                    //<<<<<<
  //
  .then((resp) => {
    res.status(200).json({ data: resp })
  })
  .catch((err) => {
    res.status(500).json({ error: err.message })
  })
});


module.exports = router;