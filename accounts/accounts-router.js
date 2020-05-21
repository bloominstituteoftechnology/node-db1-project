const express = require('express');
const db = require('../data/dbConfig');
const router = express.Router();

// router.get('/', (req, res, next) => {
// 	console.log(req.query);
// 	db('accounts')
// 		.then((accounts) => {
// 			res.status(200).json(accounts);
// 		})
// 		.catch((err) => {
// 			res.status(500).json({ message: 'Failed to get accounts' });
// 		});
// });

router.post('/', (req, res, next) => {
	const newAccount = req.body;
	db('accounts')
		.insert(newAccount)
		.then((newAccount) => {
			res.status(200).json(newAccount);
		})
		.catch((err) => {
			res.status(500).json({ message: 'Failed to add accounts' });
		});
});

router.delete('/:id', (req, res, next) => {
	const accountId = req.params.id;
	db('accounts')
		.where({ id: accountId })
		.del()
		.then((account) => {
			if (account > 0) {
				res.status(200).json({ id: Number(req.params.id) });
			} else {
				res.status(404).json({
					message: 'The account with the specified ID does not exist.',
				});
			}
		})
		.catch((err) => {
			res.status(500).json({ message: 'Failed to add accounts' });
		});
});

router.put('/:id', (req, res, next) => {
	const accountId = req.params.id;
	db('accounts')
		.where({ id: accountId })
		.update(req.body)
		.then((account) => {
			if (account > 0) {
				res.status(200).json({ id: Number(req.params.id) });
			} else {
				res.status(404).json({
					message: 'The account with the specified ID does not exist.',
				});
			}
		})
		.catch((err) => {
			res.status(500).json({ message: 'Failed to edit accounts' });
		});
});

router.get('/', (req, res, next) => {
	console.log(req.query);
	const limit = Number(req.query.limit);
	const sortBy = req.query.sortby;

	db('accounts')
		.limit(limit)
		.orderBy(sortBy, req.query.sortdir)
		.then((accounts) => {
			res.status(200).json(accounts);
		})
		.catch((err) => {
			res.status(500).json({ message: 'Failed to get accounts' });
		});
});

module.exports = router;
