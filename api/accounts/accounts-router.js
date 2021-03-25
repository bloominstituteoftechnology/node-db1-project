const router = require('express').Router();
const Middleware = require('./accounts-middleware');
const ExpressError = require('../expressError');
const Accounts = require('./accounts-model');

router.get('/', async (req, res, next) => {
	// !! DO YOUR MAGIC
	try {
		const data = await Accounts.getAll();
		res.status(200).json(data);
	} catch (err) {
		next(new ExpressError(err, 500));
	}
});

router.get('/:id', Middleware.checkAccountId, (req, res) => {
	// !! DO YOUR MAGIC
	res.status(200).json(req.account);
});

router.post('/', (req, res, next) => {
	// !! DO YOUR MAGIC
});

router.put('/:id', (req, res, next) => {
	// !! DO YOUR MAGIC
});

router.delete('/:id', (req, res, next) => {
	// !! DO YOUR MAGIC
});

router.use((err, req, res, next) => {
	// eslint-disable-line
	// CALL next(err) IF THE PROMISE REJECTS INSIDE YOUR ENDPOINTS
	err.statusCode = err.statusCode || 500;
	res.status(err.statusCode).json({
		message: err.message,
		stack: err.stack,
	});
	next(err);
	// res.status(500).json({
	// 	message: 'something went wrong inside the accounts router',
	// 	errMessage: err.message,
	// });
});

module.exports = router;
