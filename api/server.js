const express = require("express");

const db = require("../data/dbConfig.js");

const server = express();

server.use(express.json());

server.get("/api/accounts", (req, res) => {
  db("accounts")
    .then((users) => res.status(200).json(users).end())
    .catch((err) =>
      res.status(500).json({ message: "failed to retrieve users" }).end()
    );
});

server.get("/api/accounts/:id", (req, res) => {
  const id = req.params.id;

  db("accounts")
    .where({ id })
    .then((users) => {
      if (users.length) {
        res.status(200).json(users).end();
      } else {
        res.status(404).json({ message: "user not found" }).end();
      }
    })
    .catch((err) =>
      res
        .status(500)
        .json({
          message: "database error",
        })
        .end()
    );
});

server.post("/api/accounts", (req, res) => {
  if (req.body.name === "" || req.body.budget === "") {
    res.status(400).json({ message: "Bad Request" }).end();
  } else {
    db("accounts")
      .insert(req.body)
      .then((user) => {
        if (user.length) {
          db("accounts")
            .where({ id: user[0] })
            .then((user) => {
              if (user.length) {
                res.status(201).json(user[0]).end();
              } else {
                res
                  .status(500)
                  .json({ message: "User could not be added" })
                  .end();
              }
            })
            .catch((err) => {
              res.status(500).json({ message: "Something happened" }).end();
            });
        } else {
          res.status(400).json({ message: "user could not be added" }).end();
        }
      })
      .catch((err) => {
        res.status(500).json({ message: "Database error" }).end();
      });
  }
});
server.put("/api/accounts/:id", (req, res) => {
    const id = req.params.id
    if (req.body.name === "" || req.body.budget === "") {
        res.status(400).json({ message: "Bad Request" }).end();
      } else {
        db("accounts")
        .where({ id })
          .update(req.body)
          .then((user) => {
            if (user.length) {
              db("accounts")
                .where({ id })
                .then((user) => {
                  if (user.length) {
                    res.status(201).json(user).end();
                  } else {
                    res
                      .status(404)
                      .json({ message: "User could not be found" })
                      .end();
                  }
                })
                .catch((err) => {
                  res.status(500).json({ message: "Something happened" }).end();
                });
            } else {
              res.status(400).json({ message: "user could not be added" }).end();
            }
          })
          .catch((err) => {
            res.status(500).json({ message: "Database error" }).end();
          });
      }
});
server.delete("api/accounts/:id", (req, res) => {
const id = req.params.id
db("accounts")
.where({ id })
.del()
.then(num => {
    if(num = 1){
        res.status(204).json({message: "user deleted"}).end()
    }else{
        res.status(404).json({message: "user could not be found/deleted"}).end()
    }
})
.catch(err => {
    res.status(500).json({message: "somethin went wrong"}).end()
})
});

module.exports = server;