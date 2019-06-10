const express = require('express');

const server = express();

// your code here
const accountsDb = require('./data/accounts-model');


server.use(express.json());



server.get('/', (req, res) => {
    res.send('<h1>MY DATABASE</h1>')
})


//GET
server.get('/api/accounts', (req, res) => {
    accountsDb.find()
           .then(accounts => {
                res.status(200).json(accounts)
            })
           .catch(err => {
              console.log(err)
                res.status(500).json({ message: 'Error getting budgets' })
            })
});

//GET account by ID
server.get('/accounts/:id',(req, res) => {
      accountsDb.findById(req.params.id)
        .then(account => {
         if (id) {
           res.status(200).json(account);
         } else {
           res.status(404).json({message: "User id not found"})
        }
    })
  .catch(err => {
     console.log(err)
       res.status(500).json({ message: 'Could not add account' })
   });})  

//POST
server.post('/api/accounts', (req, res) => {
  const addAccount = req.body;
  const { name, budget } = req.body
  accountsDb.add(addAccount)
           .then(account => {
                if(!name || !budget) {
                  res.status(400).json({ message: 'Name and Budget fields are required' }); 
                } else {
                  res.status(201).json(account)
                }
             })
           .catch(err => {
              console.log(err)
                res.status(500).json({ message: 'Could not add account' })
            })
});


//DELETE 
server.delete('/api/accounts/:id', (req, res) => {
  const { id } = req.params;
  accountsDb.remove(id)
           .then(account => {
              res.status(204).json(account)
            })
           .catch(err => {
            console.log(err)
              res.status(500).json({ message: 'Could not delete account' })
  })
});

//Actions PUT
server.put('/api/accounts/:id', (req, res) => {
  const { id } = req.params;
  const update = req.body;
  accountsDb.update(id, update)
           .then(account => {
              if(!id) {
                  res.status(404).json({messgae: 'Cannot find that Id'})
              } else {
                  res.status(201).json(account);
              }})
           .catch(err => {
            console.log(err)
              res.status(500).json({ message: 'Could not update action' })
          })
});

module.exports = server;