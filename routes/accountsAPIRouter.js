const express = require('express');

const db = require('./../data/dbConfig.js');

const router = express.Router();

//GET
router.get('/', (request, responce) => {
  db.select('*').from("accounts")
    .then(acc => {
      responce.json(acc);
    })
    .catch( error => {
      console.log(error);
      responce.status(500).json(
        {
          error: "Get Failed."
        }
      )
    })
});// returns an empy arr?
// npx knex seed:run

//POST
router.post('/', (request, responce) => {
  //console.log(request.body);
  //db.select('*').from("accounts").insert(request.body)
  db("accounts").insert(request.body)
    .then(idOfAdded => {
      //console.log(idOfAdded);// id = index 0
      db("accounts").where({id:idOfAdded[0]})
      .then(acc => {
        responce.json(acc);
      })
      .catch( error => {
        console.log(error);
        responce.status(500).json(
          {
            error: "Where by ID Failed."
          }
        )
      })
      //responce.json(output);
      //responce.json(idOfAdded);
    })
    .catch( error => {
      console.log(error);
      responce.status(500).json(
        {
          error: "Post Failed."
        }
      )
    })
});

//PUT
router.put('/:id', (request, responce) => {
  const idVal = request.params.id;
  db("accounts").where({ id: idVal }).update(request.body)
    .then(numUpdated => {
      responce.json(numUpdated);
      //console.log(numUpdated);
    })
    .catch( error => {
      console.log(error);
      responce.status(500).json(
        {
          error: "PUT Failed."
        }
      )
    })
});

//DEL
router.delete('/:id', (request, responce) => {
  const idVal = request.params.id;
  db("accounts").where({ id: idVal }).del()
    .then(numRemoved => {
      responce.json(numRemoved);
      //console.log(numRemoved);
    })
    .catch( error => {
      console.log(error);
      responce.status(500).json(
        {
          error: "PUT Failed."
        }
      )
    })
});

module.exports = router;

/*
npx knex migrate:rollback
npx knex migrate:latest
npx knex seed:run
*/
