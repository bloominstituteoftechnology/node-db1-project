const express = require("express")

const db =  require('../data/seeds/accountsDb.js');
const router = express.Router()




router.get("/", async (req, res, next) => {
    try {
        //translates to 'SELECT * FROM accounts;'
        const accounts = await db.find();
        
        res.json(accounts)
    } catch (err) {
        next(err)
    }
})

// router.get("/:id", (req, res, next) => {

// })

// router.get("/:id", async (req, res, next) => {
// 	try {
// 		// translates to `SELECT * FROM messages WHERE id = ? LIMIT 1;`
// 		const [message] = await db
// 			.select("*")
// 			.from("messages")
// 			.where("id", req.params.id)
// 			.limit(1)

// 		res.json(message)
// 	} catch (err) {
// 		next(err)
// 	}
// })



// router.post("/", async (req, res, next) => {
//     const accountData = req.body;

//     try {
//         const totalAccounts = await knew('accounts').insert('accountData');
//         res.status(201).json(totalAccounts);

//     } catch (err) {
//         console.log("error: ", err);
//         next(err)
//     }
// })

// router.post("/", async (req, res, next) => {
// 	try {
// 		// translates to `INSERT INTO messages (title, contents) VALUES (?, ?);`
// 		const [id] = await db
// 			.insert({
// 				// database will automatically generate the ID
// 				title: req.body.title,
// 				contents: req.body.contents,
// 			})
// 			.into("messages")

// 		// translates to `SELECT * FROM messages WHERE id = ? LIMIT 1;`
// 		const message = await db("messages")
// 			.where("id", id)
// 			.first()

// 		res.status(201).json(message)
// 	} catch (err) {
// 		next(err)
// 	}
// })




// router.put("/:id", (req, res, next) => {

// })

// router.put("/:id", async (req, res, next) => {
// 	try {
// 		// translates to `UPDATE messages SET title = ? AND contents = ? WHERE id = ?;`
// 		await db("messages")
// 			.update({
// 				title: req.body.title,
// 				contents: req.body.contents,
// 			})
//             .where("id", req.params.id)
//             // translates to `SELECT * FROM messages WHERE id = ? LIMIT 1;`

// 		const message = await db("messages")
//             .where("id", req.params.id)
//             .first()
//             res.json(message)

//         } catch (err) {
//             next(err)
//         }
// })




// router.delete("/:id", (req, res, next) => {

// })


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

module.exports = router;

