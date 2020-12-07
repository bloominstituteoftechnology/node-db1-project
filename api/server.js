const express = require("express");

const db = require("../data/dbConfig.js");

const server = express();

server.use(express.json());

const validateNewAccount = (req, res, next) => {
	if (req.body.name && req.body.budget) {
		req.newAccount = { name: req.body.name, budget: req.body.budget };
		next();
	} else {
		res.status(400).end();
	}
};

const validateAccountChanges = (req, res, next) => {
	if (req.body.name || req.body.budget) {
		let changes = {};
		if (req.body.name) {
			changes = { ...changes, name: req.body.name };
		}
		if (req.body.budget) {
			changes = { ...changes, budget: req.body.budget };
		}
		req.changes = changes;
		next();
	} else {
		res.status(400).end();
	}
};

const getAccount = (id) => {
	return db("accounts").where({ id: id });
};

server.get("/", (req, res) => {
	db("accounts")
		.then((r) => res.status(200).json(r))
		.catch((e) => res.status(500).json(e.message));
});

server.post("/", validateNewAccount, (req, res) => {
	db("accounts")
		.insert(req.newAccount)
		.then((r) => {
			getAccount(r[0]).then((user) => res.status(200).json(user[0]));
		})
		.catch((e) => {
			res.status(500).json(e.message);
		});
});

server.put("/:id", validateAccountChanges, (req, res) => {
	db("accounts")
		.where({ id: req.params.id })
		.update(req.changes)
		.then((r) => {
			if (r === 1) {
				getAccount(req.params.id).then((user) => res.status(200).json(user[0]));
			} else if (r === 0) {
				res.status(404).end();
			} else {
				res.status(500).end();
			}
		})
		.catch((e) => res.status(500).json(e.message));
});

server.delete("/:id", (req, res) => {
	db("accounts")
		.where({ id: req.params.id })
		.del()
		.then((r) => {
			if (r === 1) {
				res.status(200).end();
			} else if (r === 0) {
				res.status(404).end();
			} else {
				r.status(500).end();
			}
		})
		.catch((e) => res.status(500).json(e.message));
});

server.use("*", (req, res) => {
	res.status(404).end();
});

module.exports = server;
