const express = require('express');

const db = require('../data/dbConfig');

const router = express.Router();


router.get('/', (req, res) => {
    db('accounts')
     // .limit(5) //returns the first 5 accounts only
     // .orderBy('budget') // returns the accounts based on the budget in an ascending order
     // .orderBy('budget', 'desc')  // returns the accounts based on the budget in an descending order
       .then(account => {
            res.status(200).json(account);
        })
        .catch(err =>{
            res.status(500).json({message :"error retriving data"})
        })
});

// long version
// router.get('/:id', (req, res) => {
//     const { id } = req.params;
//       db
//         .select('*')
//         .from('accounts')
//         .where({ id })
//         .first()
//         .then(account => {
//             if (account) {
//                 res.status(200).json(account);
//             } else {
//                 res.status(404).json({ message: "account not found" })
//             }
//         })
//         .catch(error => {
//             res.status(500).json({ message: "sorry, ran into an error" });
//         });
// });

router.get("/:id", (req, res) => {
    const { id } = req.params;

    db('accounts')
        .where({ id })
        .then((account) => {
            if(account){ res.status(200).json(account)
            } else {
                res.status(404).json({message: "account not found", })
            }
        })
        .catch((err) =>
            res.status(500).json({ message: "error retrieving account with id", err })
       );
});


// Using async/await promise handling.

// router.post('/', async (req, res) => {
//     const accountData = req.body;

//     try {
//         const acount = await db.insert(accountData).into('accounts');
//         res.status(201).json(acount);
//     } catch (err) {
//         res.status(500).json({ message: 'db problem', error: err });
//     }
//     return;
// });

router.post('/', (req, res) => {
    const accountData= req.body;
    db('accounts')
        .insert(accountData)
        .then((account) => res.status(200).json(accountData))
        .catch((err) =>
            res.status(500).json({ message: "faild to create account ", err })
        );
});

router.put('/:id', (req, res) => {
    const { id } = req.params;
    const changes = req.body;

    db('accounts')
        .where({id})
        .update(changes)
        .then((account) => {
            if(account){ res.status(200).json(changes)
            } else {
                res.status(404).json({message: "account not found", })
            }
        })
        .catch((err) =>
            res.status(500).json({ message: "faild to create account ", err })
        );
});


// Using async/await promise handling.

// router.delete('/:id', async (req, res) => {
//     const { id } = req.params;

//     try {
//         const count = await db.del().from('accounts').where({ id });
//         count ? res.status(200).json({ deleted: count })
//             : res.status(404).json({ message: 'invalid id' });
//     } catch (err) {
//         res.status(500).json({ message: 'database error', error: err });
//     }

// });



router.delete('/:id', (req, res) => {
    const { id } = req.params;
    db('accounts')
        .where({id})
        .del()
        .then((account) => {
            if(account){ res.status(200).json({message: "account deleted succesfully"})
            } else {
                res.status(404).json({message: "account not found", })
            }
        })
        .catch((err) =>
            res.status(500).json({ message: "faild to delete account ", err })
        );
});

module.exports = router;