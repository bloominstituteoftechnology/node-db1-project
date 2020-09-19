const express = require('express')

const db = require('../../data/dbConfig.js');

const {json} = require('express');

const router = express.Router();


// router.get('/', async (req,res) => {
//     try {
//         const accounts = await db('accounts');
//         res.json(accounts);
//     } catch(err) {
//         res.status(500).json({message:'there was an error'})
//     }
// })

router.get('/', async (req,res) => {
    try {
        const accounts = await db('accounts');
        res.json(accounts);
    }  catch (err) {
        res.status(500).json({message:"no <3"})
    }
  })
  

router.get('/:id', async (req,res) => {
    const { id } = req.params;
    try {
        const [account] = await db('accounts').where({id});
        if(account) {
            res.status(200).json(account)
        } else{
            res.status(404).json({message:'error'})
        }
    } catch(err) {
        res.status(500).json({message:'there was a 500 error'})    }
})


router.post('/', async (req,res) => {
    const newAccount = req.body; 
  try {
    const account = await db('accounts').insert(newAccount)
    res.status(201).json(newAccount)
  } catch(err) {
      res.status(500).json({message:"There was a 500 error"})
  }
})

router.put('/:id', async (req, res) => {
const {id} = req.params; 
const changes = req.body;
try {
    const count = await db('accounts').update(changes).where({id})
    if(count) {
        res.json({updated:count})
    } else {
        res.status(404).json({message:'invalid id'})
    } 
} catch(err) {
    console.log(err)
    res.status(500).json({messagr:"There was an error updating the account"})
}
}
)

router.delete('/:id', async (req, res) => {
    const {id} = req.params;
    
    try {
        const count = await db('accounts').where({id}).del();
    if(count) {
    
        res.json({deleted:count});
    } else {
        res.status(404).json({message:"invalid id"})
    
      }
    } catch(err) {
        res.status(500).json({message:'no'})
    }
    });
    

module.exports = router