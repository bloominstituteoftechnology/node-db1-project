const router = require("express").Router();
const Accounts = require("./accounts-model");

router.get("/", async (req, res, next) => {
	res.json(await Accounts.getAll());
});

router.get("/:id", async (req, res, next) => {
	res.json(await Accounts.getById(req.params.id));
});

router.post("/", async (req, res, next) => {
	res.json(await Accounts.create(req.body));
});

router.put("/:id", async (req, res, next) => {
	res.json(await Accounts.updateById(req.params.id, req.body));
});

router.delete("/:id", async (req, res, next) => {
	res.json(await Accounts.deleteById(req.params.id));
});

router.use((err, req, res, next) => {
	// eslint-disable-line
	// DO YOUR MAGIC
});

module.exports = router;
