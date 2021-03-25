const Accounts = require('./accounts-model');
const ExpressError = require('../expressError');

exports.checkAccountPayload = (req, res, next) => {
	// !! DO YOUR MAGIC
	try {
		const newAccount = req.body;
		if (newAccount.name) {
			newAccount.name = newAccount.name.trim();
		}

		if (!newAccount.name || !newAccount.budget) {
			const err = new ExpressError(
				'Body must contain name, budget, or both',
				400
			);
			next(err);
		} else if (typeof newAccount.name !== 'string') {
			const err = new ExpressError(
				'Name of account must be a string',
				400
			);
			next(err);
		} else if (
			newAccount.name.length < 3 ||
			newAccount.name.length > 100
		) {
			const err = new ExpressError(
				'Name of account must be between 3 and 100',
				400
			);
			next(err);
		} else if (typeof newAccount.budget !== 'number') {
			const err = new ExpressError(
				'Budget of account must be a number',
				400
			);
			next(err);
		} else if (newAccount.budget < 0 || newAccount.budget > 1000000) {
			const err = new ExpressError(
				'Budget of account cannot be less than 0 or more than 1,000,000',
				400
			);
			next(err);
		} else {
			const err = new ExpressError(
				'There was an error saving the account to the database',
				404
			);
			next(err);
		}
	} catch (err) {
		next(new ExpressError(err, 500));
	}
};

exports.checkAccountNameUnique = async (req, res, next) => {
	// !! DO YOUR MAGIC
};

exports.checkAccountId = async (req, res, next) => {
	// !! DO YOUR MAGIC
	try {
		const account = await Accounts.getById(req.params.id);
		if (account) {
			req.account = account;
			next();
		} else {
			const err = new ExpressError('account not found', 404);
			next(err);
		}
	} catch (err) {
		next(new ExpressError(err, 500));
	}
};
