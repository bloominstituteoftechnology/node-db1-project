const Accounts = require("./accounts-model");
const accountSchema = require("./validation");

exports.checkAccountPayload = async (req, res, next) => {
	try {
		if (typeof req.body.budget === "string")
			return next({ status: 400, message: "must be a number" });
		req.validatedBody = await accountSchema.validateAsync(req.body, {
			stripUnknown: true,
		});
		next();
	} catch (err) {
		next({ status: 400, message: err.details[0].message });
	}
};

exports.checkAccountNameUnique = async (req, res, next) => {
	try {
		req.newAccount = await Accounts.create(req.validatedBody);
		next();
	} catch (err) {
		next({ status: 400, message: "name is taken" });
	}
};

exports.checkAccountId = async (req, res, next) => {
	try {
		const account = await Accounts.getById(req.params.id);
		if (account) {
			req.account = account;
			next();
		} else {
			next({ status: 404, message: `account not found` });
		}
	} catch (err) {
		next(err);
	}
};
