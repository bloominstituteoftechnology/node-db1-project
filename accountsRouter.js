const express = require("express");

const router = express.Router();

const db = require("./data/dbConfig");

router.get("/", async (req, res) => {
  const accounts = await db
    .select("*")
    .from("accounts")
    .then((accounts) => {
      res.status(200).json(accounts);
    })
    .catch((error) => {
      res.status(500).json(error);
    });
});

router.get("/:id", async (req, res) => {
  const id = req.params.id;
  const account = await db
    .select("*")
    .from("accounts")
    .where("id", id)
    .first()
    .then((account) => {
      if (account) {
        res.status(200).json(account);
      } else {
        res.status(404).json({ MESSAGE: "THAT ACCOUNT ID DOES NOT EXIST" });
      }
    })
    .catch((error) => {
      res.status(500).json(error);
    });
});

router.post("/", async (req, res) => {
  const post = req.body;
  const id = req.body.params;
  if (validatePost(post)) {
    db("accounts")
      .insert(post, "id")
      .where("id", id)
      .then((post) => {
        res.json(post);
      })
      .catch((error) => {
        res.status(500).json(error);
      });
  } else {
    res.status(400).json({ message: "please provide a name and budget" });
  }
});

router.put("/:id", async (req, res) => {
  const id = req.params.id;
  const post = req.body;
  if (validateUpdate(post)) {
    const account = await db("accounts")
      .where("id", id)
      .update({ name: req.body.name, budget: req.body.budget })
      .then((account) => {
        if (account) {
          res.status(200).json({ MESSAGE: `UPDATED ${account} account(s)!` });
        } else {
          res.status(404).json({ MESSAGE: "THAT ACCOUNT ID DOES NOT EXIST" });
        }
      })
      .catch((error) => {
        res.status(500).json(error);
      });
  } else {
    res.status(400).json({ MESSAGE: "Please Include A Name or Budget" });
  }
});

router.delete("/:id", async (req, res) => {
  const id = req.params.id;
  const account = await db("accounts")
    .where("id", id)
    .delete()
    .then((account) => {
      if (account) {
        res.status(200).json({ Message: "Succesfuly Deleted Account" + id });
      } else {
        res.status(404).json({ MESSAGE: "THAT ACCOUNT ID DOES NOT EXIST" });
      }
    })
    .catch((error) => {
      res.status(500).json(error);
    });
});

const validatePost = (post) => {
  return Boolean(post.name && post.budget);
};

const validateUpdate = (post) => {
  return Boolean(post.name || post.budget);
};

module.exports = router;
