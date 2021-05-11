const Joi = require("joi");

const accountSchema = Joi.object({
	name: Joi.string()
		.trim()
		.min(3)
		.max(100)
		.required()
		.messages({
            "string.min": "name of account must be between 3 and 100",
            "string.max": "name of account must be between 3 and 100",
            "string.base": "name of account must be a string",
            "any.required": "name and budget are required" 
        }),
	budget: Joi.number()
		.min(0)
		.max(1000000)
		.required()
		.messages({
            "number.base": "budget of account must be a number",
            "number.min": "budget of account is too large or too small",
            "number.max": "budget of account is too large or too small",
            "any.required": "name and budget are required" 
        }),
	completed: Joi.boolean(),
});

module.exports = accountSchema;
