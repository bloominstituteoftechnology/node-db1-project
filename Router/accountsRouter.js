const express = require('express');
const knex = require('../data/dbConfig.js');

const router = express.Router();

router.get('/', (req, res) => {
	knex('accounts')
		.then((accounts) => {
			console.log('TCL: accounts', accounts);
			res.status(200).json(accounts);
		})
		.catch((err) => {
			res.status(500).json({ error: 'could not retrieve data', err });
		});
});

router.get('/:id', (req, res) => {
	const { id } = req.params;

	knex('accounts')
		.where({ id })
		.then((account) => {
			res.status(200).json(account);
		})
		.catch((err) => {
			res.status(500).json({ error: 'could not retrieve account', err });
		});
});

router.post('/', (req, res) => {
	const body = req.body;

	knex('accounts')
		.insert(body)
		.then((inserted) => {
			res.status(201).json(inserted);
		})
		.catch((err) => {
			res.status(500).json({ error: 'could not add new account', err });
		});
});

router.put('/:id', (req, res) => {
	const { id } = req.params;
	const changes = req.body;

	knex('accounts')
		.where({ id })
		.update(changes)
		.then((updated) => {
			res.status(202).json(updated);
		})
		.catch((err) => {
			res.status(500).json({ error: 'could not update account', err });
		});
});

router.delete('/:id', (req, res) => {
	const id = req.params.id;

	knex('accounts')
		.where({ id })
		.del()
		.then((deleted) => {
			res.status(201).json(deleted);
		})
		.catch((err) => {
			res.status(500).json({ error: 'could not deleted account', err });
		});
});

module.exports = router;
