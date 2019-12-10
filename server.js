const express = require('express');

const db = require('./data/dbConfig.js');

const server = express();

server.use(express.json());

server.get('/', (req, res) => {
    db("accounts")
        // .select('*')
        // .from('accounts')
        .then(accounts => {
            res.status(200).json(accounts);
        })
        .catch(error => {
            console.log(error);
            res.status(500).json({ errorMessage: "Error getting the accounts"});
        });
});

server.get("/:id", (req, res) => {
    db("accounts")
    //   .select("*")
    //   .from("accounts")
      .where({ id: req.params.id })
      .first()
      .then(post => {
        res.status(200).json(post);
      })
      .catch(error => {
        console.log(error);
        res.status(500).json({ errorMessage: "Error getting the accounts" });
      });
  });

//   server.post("/", (req, res) => {
//     const postData = req.body;

//     db("accounts")
//       .insert(postData)
//           .then(postData => {
//             res.status(201).json(postData);
//           })
//       .catch(error => {
//         console.log(error);
//         res.status(500).json({
//           errorMessage: "Error adding the accounts"
//         });
//     })
// })

server.post('/', (req,res)=>{
    const account = req.body;
    !req.body.name || !req.body.budget ? res.status(400).json({message: "Must have a name and a budget!"}):
        db('accounts').insert(account)
            .then( account => {
                res
                    .status(200)
                    .json(account)
            })
            .catch( error => {
                console.log(error);
                res
                    .status(500)
                    .json({ message: "Error retrieving accounts from database" });
            })
});

  server.put("/:id", (req, res) => {
    // const { id } = req.params;
    const changes = req.body;
  
    db("accounts")
      .where({ id: req.params.id }) // ALWAYS FILTER ON UPDATE (AND DELETE)
      .update(changes)
      .then(count => {
        if (count > 0) {
          res.status(200).json({ message: `${count} record(s) updated` });
        } else {
          res.status(404).json({ message: "Account not found" });
        }
      })
      .catch(error => {
        console.log(error);
        res.status(500).json({
          errorMessage: "Error updating the account"
        });
      });
  });

  server.delete("/:id", (req, res) => {
    db("accounts")
      .where({ id: req.params.id }) // ALWAYS FILTER ON UPDATE (AND DELETE)
      .del()
      .then(count => {
        res.status(200).json({ message: `${count} record(s) removed` });
      })
      .catch(error => {
        console.log(error);
        res.status(500).json({
          errorMessage: "Error removing the account"
        });
      });
  });

module.exports = server;