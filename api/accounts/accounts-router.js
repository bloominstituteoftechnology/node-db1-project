const router = require("express").Router();
const Accounts = require("./accounts-model");
const {
	checkAccountPayload,
	checkAccountNameUnique,
	checkAccountId,
} = require("./accounts-middleware");

router.get("/", async (req, res, next) => {
	res.json(await Accounts.getAll());
});

router.get("/:id", checkAccountId, async (req, res, next) => {
	res.json(await Accounts.getById(req.params.id));
});

router.post("/", checkAccountPayload, checkAccountNameUnique, async (req, res, next) => {
	try {
		res.status(201).json(req.newAccount);
	} catch (err) {
		next(err);
	}
});

router.put("/:id", checkAccountId, checkAccountPayload, async (req, res, next) => {
	try {
		res.json(await Accounts.updateById(req.params.id, req.body));
	} catch (err) {
		next(err);
	}
});

router.delete("/:id", checkAccountId, async (req, res, next) => {
	try {
		res.json(await Accounts.deleteById(req.params.id));
	} catch (err) {
		next(err);
	}
});

router.use((err, req, res, next) => {
	res.status(err.status || 500).json({
		message: err.message,
		note: "Something went wrong in the router",
	});
});

module.exports = router;
