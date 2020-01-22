const router = require('express').Router();
const db = require('../dbConfig');


router.get('/', (request, response) => {

    db
    .select('*')
    .from('accounts')
    .then(acc => {
        response.status(200).json(acc);
    })
    .catch(error => {
        response.status(500).json({
            errorMsg: `Error retrieving accounts. ${error}`
        })
    })
})


router.get('/:id', (request, response) => {
    db
    .select('*')
    .from('accounts')
    .where({id: request.params.id})
    .first() // accounts[0]
    .then(post => {
        response.status(200).json(post)
    })
    .catch(error => {
        response.status(500).json({
            errorMsg: `Error retrieving the account. ${error}`
        })
    })
})


router.post('/', (request, response) => {

  const body = request.body;

  (!body.name || !body.budget) ? response.status(400).json({ errorMsg: "Name and budget is required." }) :
  db('accounts')
  .insert(body, 'id')
  .then(([id]) => {
    db('accounts')
    .where({ id })
    .first() // accounts[0]
    .then(post => {
      response.status(200).json(post)
    })
  })
  .catch(error => {
    response.status(500).json({
      errorMsg: `There was an error posting this request. ${error}`
    })
  })
})

router.put('/:id', (request, response) => {
   
    const updates = request.body;

    // validating
    db('accounts')
    .where({id: request.params.id})
    .update(updates)
    .then(count => {
        if (count > 0) {
            response.status(200).json({
                mesg: `${count} records updated`
            })
        } else {
            response.status(404).json({
                errorMsg: `Account was not found`
            })
        }
    })
    .catch(error => {
        response.status(500).json({
            errorMsg: `Error updating the account. ${error}`
        })
    })
})

router.delete('/:id', (request, response) => {
    db('accounts')
    .where({id: request.params.id}) // always filter on update and delete
    .del()
    .then(count => {
        response.status(200).json({
            mesg: `${count} records removed`
        })
    })
    .catch(error => {
        response.status(500).json({
            errorMsg: `Error removing the account. ${error}`
        })
    })
})

module.exports = router;