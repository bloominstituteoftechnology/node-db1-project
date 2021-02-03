const express = require("express");

const db = require("../data/dbConfig.js");

const server = express();

server.use(express.json());

server.get("/", (req, res) => {
  db("accounts")
    .then((accounts) => {
      if (accounts) res.status(200).send(accounts);
      else res.status(404).json({ message: "accounts not found" });
    })
    .catch((error) =>
      res.status(500).json({ message: "Server Failed getting the data", error })
    );
});

server.get("/:id", (req, res) => {
  const { id } = req.params;

  db("accounts")
    .where({ id })
    .then((accounts) => {
      if (accounts && accounts.length > 0) res.status(200).send(accounts);
      else res.status(404).json({ message: "account not found" });
    })
    .catch((error) =>
      res.status(500).json({ message: "Server Failed getting the data", error })
    );
});

server.post("/", (req, res) => {
  const account = req.body;

  if (!account.name || !account.budget)
    res.status(400).json({ message: "Your request should a name and budget" });

  if (!Number(account.budget))
    res.status(400).json({ message: "Please enter a number for your budget" });

  db("accounts")
    .insert({
      ...account,
      name: account.name.toString(),
      budget: Number(account.budget),
    })
    .then((newID) => {
      if (newID && newID.length > 0)
        res.status(201).json({
          id: newID[0],
          name: account.name.toString(),
          budget: Number(account.budget),
        });
      else res.status(500).json({ message: "account not created" });
    })
    .catch((error) =>
      res.status(500).json({ message: "Server Failed posting the data", error })
    );
});

server.put("/:id", (req, res) => {
  const { id } = req.params;
  const changes = req.body;

  db("accounts")
    .where({ id })
    .then((account) => {
      if (!account || account.length === 0)
        res.status(404).json({ message: "No record with that Id." });
      else {
        if (!changes.name || !changes.budget)
          res
            .status(400)
            .json({ message: "Your request should a name and budget" });
        else {
          if (!Number(changes.budget))
            res
              .status(400)
              .json({ message: "Please enter a number for your budget" });
          else {
            db("accounts")
              .where({ id })
              .update({
                ...changes,
                name: changes.name.toString(),
                budget: Number(changes.budget),
              })
              .then((count) => {
                if (count > 0)
                  res.status(200).json({
                    id: Number(id),
                    name: changes.name.toString(),
                    budget: Number(changes.budget),
                  });
                else res.status(500).json({ message: "account not edited" });
              })
              .catch((error) => {
                res.status(500).json({
                  message: "Server failed in posting the data",
                  error,
                });
              });
          }
        }
      }
    })
    .catch((error) => {
      res
        .status(500)
        .json({ message: "Server failed in editing the data", error });
    });
});

server.delete("/:id", (req, res) => {
  const { id } = req.params;

  db("accounts")
    .where({ id })
    .then((account) => {
      if (!account || account.length === 0)
        res.status(404).json({ message: "No record with that Id." });
      else {
        db("accounts")
          .where({ id })
          .delete()
          .then((count) => {
            if (count > 0) res.sendStatus(204);
            else res.status(500).json({ message: "account not deleted" });
          })
          .catch((error) =>
            res
              .status(500)
              .json({ message: "Server failed in deleting the data", error })
          );
      }
    })
    .catch((error) => {
      res
        .status(500)
        .json({ message: "Server failed in deleting the data", error });
    });
});

module.exports = server;