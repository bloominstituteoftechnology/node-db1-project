const server = require("./api/server.js");
const db = require("./data/dbConfig");
const knex = require("knex")

const PORT = process.env.PORT || 5000;

server.get("/accounts", (req, res) => {
  db.select("*")
    .from("accounts")
    .then((accounts) => res.status(200).json(accounts))
    .catch((err) => res.status(500).json({ message: "An error occurred" }));
});

server.post("/accounts", (req, res) => {
  const {name , budget} = req.body;
  console.log(req.body);

  if (!name || !budget) {
    res.status(400).json({
      errorMessage: "Please provide name and budget for the post.",
    });
  }

  db.insert(req.body)
    .into("accounts")
    .then((account) => res.status(200).json(account))
    .catch((err) => res.status(500).json({ message: "An error occurred." }));
})

server.put("/accounts/:id", (req, res) => {
  if (req.body) {
    db("accounts")
      .where({ id: req.params.id })
      .update({
        name: req.body.name,
        budget: req.body.budget,
      })
      .then((data) => res.status(200).json(data))
      .catch((err) => res.status(500).json({ error: err }));
  }
});

server.delete("/accounts/:id", (req, res) => {
    db("accounts")
      .where({ id: req.params.id })
      .del()
      .then((account) => res.status(200).json(account))
      .catch((err) => res.status(500).json({ error: err }));
});

server.listen(PORT, () => {
  console.log(`\n== API running on port ${PORT} ==\n`);
});
