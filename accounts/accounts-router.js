const express = require('express');
const db = require('../data/dbConfig');
const router = express.Router();

router.get('/', async (req, res, next) => {
	try {
		res.json({
			message: 'Welcome',
		});
	} catch (err) {
		next(err);
	}
});

module.exports = router;
