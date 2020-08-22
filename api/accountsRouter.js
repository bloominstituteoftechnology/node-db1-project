const express = require("express");

const db = require("../data/seeds/accountsDb.js");
const router = express.Router();

router.get("/", async (req, res, next) => {
  try {
    const accounts = await db.find();
    res.status(200).json(accounts);
    
  } catch (err) {
    next(err);
  }
});

router.get("/:id", async (req, res, next) => {
  try {
    const account = await db.findById(req.params.id); // if not account, send 404, otherwise send 200
    if (!account) {
    res.status(404).json({ message: 'account could not be found with that ID'});

    } else {
    res.status(200).json(account);
    }
  } catch (err) {
      res.status(500).json({ message: "Something went wrong, could not find account by ID" })
    next(err);
  }
});

router.post("/", async (req, res, next) => {
    try {
		const payload = {
			name: req.body.name,
			budget: req.body.budget
		};
		
		const newAccount = await db.insert(payload);
		res.status(201).json(newAccount);
	} catch (err) {
        res.status(500).json({ message: "Something went wrong, could not add account" });
		next(err);
	}
})

router.put("/:id", async (req, res, next) => {
    try {
        
      const changes = {
        name: req.body.name,
        budget: req.body.budget,
      };

      console.log("this is on the id: ", req.params.id);

      const updatedAccount = await db.update(req.params.id, changes);
      
      res.status(204).json(updatedAccount);
      
    } catch (err) {
      res.status(500).json({ message: "Something went wrong, could not update account" });
      next(err);
    }
  });


router.delete("/:id", async (req, res, next) => {
	try {
        await db.remove(req.params.id)
        
		res.status(204).end()
	} catch (err) {
        res.status(500).json({ message: "Something went wrong, could not delete account" });
      
		next(err);
	}
})


module.exports = router;
