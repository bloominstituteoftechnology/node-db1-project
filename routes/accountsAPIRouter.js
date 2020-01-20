const express = require('express');

const db = require('./../data/dbConfig.js');

const router = express.Router();

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


module.exports = router;
