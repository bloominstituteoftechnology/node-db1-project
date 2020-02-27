const express = require('express');
const db = require('../data/dbConfig');
const router = express.Router();

router.get('/', async (req, res, next) => {
	try {
		const posts = await db.select('*').from('accounts');
		res.json(posts);
	} catch (err) {
		next(err);
	}
});

router.get('/:id', validateAccountId, async (req, res, next) => {
	try {
		const account = await db('accounts').where('id', parseInt(req.params.id)).first();
		res.json(account);
	} catch (err) {
		next(err);
	}
});

router.post('/', validateAccount, async (req, res, next) => {
	const payload = {
		name: req.body.name,
		budget: req.body.budget
	};
	try {
		const [ id ] = await db('accounts').insert(payload);
		const newAccount = await db('accounts').where('id', id).first();
		res.status(200).json(newAccount);
	} catch (err) {
		next(err);
	}
});

router.put('/:id', validateAccountId, validateAccount, async (req, res, next) => {
	const payload = {
		name: req.body.name,
		budget: req.body.budget
	};
	try {
		await db('accounts').where('id', req.params.id).update(payload);
		const account = await db('accounts').where('id', req.params.id).first();
		res.status(200).json(account);
	} catch (err) {
		next(err);
	}
});

router.delete('/:id', async (req, res, next) => {
	const id = await db('accounts').where('id', req.params.id).del();
	console.log(id);
	if (id > 0) {
		res.status(200).json({ message: 'Account is deleted' });
	}
	else {
		next();
	}
});

//custom middleware

async function validateAccountId(req, res, next) {
	const account = await db('accounts').where('id', req.params.id);
	console.log(account);
	if (!account[0]) {
		res.status(404).json({ message: 'Invalid project Id' });
	}
	else {
		next();
	}
}

async function validateAccount(req, res, next) {
	const { name, budget } = req.body;
	if (!name || !budget) {
		res.status(400).json({ message: 'PUT SOMETHING SHIT HEAD' });
	}
	else {
		next();
	}
}
module.exports = router;
