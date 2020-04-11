const express = require('express')

const db = require('../data/dbConfig')

const router = express.Router()

router.get('/', (req, res) => {
   db('accounts')
      .limit(20)
      .then(rows => {
         res.status(200).json({accounts: rows})
      })
      .catch(err => {
         res.status(500).json({message: 'Error'})
      })
})

router.get('/:id', (req, res) => {
   const { id }= req.params

   db('accounts')
      .where({ id })
      .first()
      .then(account => {
         account 
            ? res.status(200).json({ accounts: account })
            : res.status(404).json({message: 'Error Retrieving Data'})
      })
      .catch(err => {
         res.status(500).json({message: 'Account is not found!'})
      })
})

router.post('/', (req, res) => {
   const body = req.body

   db('accounts')
      .insert(body, 'id')
      .then((ids) => {
         res.status(201).json({ results: ids, account: body })
       })
      .catch((err) => {
         res.status(500).json({ "message": "Error, Could not add Account" })
      })
})

router.put('/:id', (req, res) => {
   const body = req.body
   const { id } = req.params
   
   db('accounts')
      .where({id: id})
      .update(body)
      .then(count => {
         count > 0
            ? res.status(200).json({ message: 'Updated', account: body })
            : res.status(404).json({message: 'ACCOUNT ID DOES NOT EXIST!'})
      })
      .catch((err) => {
	      res.status(500).json({ message: 'Error Updating Account' })
      })

})

router.delete('/:id', (req, res) => {
   const {id}=req.params
   db('accounts')
      .where({ id: id })
      .del()
      .then(count => {
         count > 0 
            ? res.status(200).json({ message: 'Deleted', account: req.body })
            : res.status(404).json({message: 'ACCOUNT ID DOES NOT ExiST'})
      })
      .catch((err) => {
		   res.status(500).json({ message: 'Error, did not Delete' })
	   })
})

module.exports = router