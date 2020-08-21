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
    const account = await db.findById(req.params.id);
    res.status(200).json(account);
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





// router.delete("/:id", async (req, res, next) => {
// 	try {
// 		// translates to `DELETE FROM messages WHERE id = ?;`
// 		await db("messages")
// 			.where("id", req.params.id)
// 			.del()

// 		// since we no longer have a resource to return, just send a 204.
// 		// which means "success, but no response data is being sent".
// 		res.status(204).end()
// 	} catch (err) {
// 		next(err)
// 	}
// })

// router.delete("/:id", async (req, res) => {
//     const account = await db("accounts").where("id", req.params.id);
//     try {
//         await db("accounts").where("id", req.params.id).del();
//         res.status(200).json({message: "deleted", account});
//     } catch (e) {
//         console.log(e.stack);
//         res.status(500).json({message: "Error deleting account"});
//     }
// });


module.exports = router;
