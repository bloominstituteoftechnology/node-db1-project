const yup = require('yup');

const Accounts = require('./accounts-model');
const db = require('../../data/db-config');

const accountSchema = yup.object().shape({
  name: yup
    .string()
    .typeError('must be a string')
    .required('name and budget are required')
    .min(3, 'between 3 and 100')
    .max(100, 'between 3 and 100'),
  budget: yup
    .number()
    .typeError('budget must be a number')
    .required('name and budget are required')
    .test(
      'Is positive?',
      'too large or too small',
      value => value > 0 && value < 1000000
    )
});

exports.checkAccountPayload = async (req, res, next) => {
  try {
    if (typeof req.body.name === 'string') {
      req.body.name = req.body.name.trim();
    }
    const validated = await accountSchema.validate(
      req.body,
      {strict: true, stripUnknown: true}
    );
    req.body = validated;
    next();
  } catch (err) {
    next({status: 400, message: err.message});
  }
}

exports.checkAccountNameUnique = async (req, res, next) => {
  const [checkName] = await db('accounts').where('name', req.body.name);
  if (checkName) {
    next({status: 400, message: 'name is taken'});
  } else {
    next();
  }
}

exports.checkAccountId = async (req, res, next) => {
  const account = await Accounts.getById(req.params.id);
  if (account) {
    req.account = account;
    next();
  } else {
    next({status: 404, message: 'account not found'});
  }
}
