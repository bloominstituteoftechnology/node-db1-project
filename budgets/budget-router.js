const express = require('express');

const Budgets = require('./budget-model');

const router = express.Router();

router.get('/', (req, res) => {
    Budgets.getAll()
    .then(budgets => {
        res.json(budgets);
    })
    .catch(err =>{
        res.status(500).json({message: 'failed to get the budget...guess that means youre free to spend as you please'});
    });
});

router.get('./:id', (req, res) =>{
    const {id} = req.params;

    Budgets.getById(id)
    .then(budget => {
        if(scheme){
            res.json(budget);
        } else {
            res.status(404).json({message:'That budget doesnt exist...i think'});
        }
    })
    .catch(err => {
        res.status(500).json({message: 'Sorry i wasnt paying attention whats going on?'});
    });
});

router.post('/', (req, res) =>{
    const budgetdata = req.body;

    Budgets.create(budgetdata)
    .then(budget =>{
        res.status(201).json(budget);
    })
    .catch(err => {
        res.status(500).json({message: 'you dont need a budget just figure it out'});
    });
});

router.delete('/:id', (req, res) => {
    const { id } = req.params;
  
    Budgets.delete(id)
      .then(deleted => {
        if (deleted) {
          res.json({ removed: deleted });
        } else {
          res.status(404).json({ message: 'There was no budget with that id' });
        }
      })
      .catch(err => {
        res.status(500).json({ message: 'Deleting the budget wont solve your problems' });
      });
  });

  module.exports = router;