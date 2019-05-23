const express = require('express');

const server = express();

const Budgets = require('./data/accounts-model.js');

server.use(express.json());

server.get('/', async (req, res) => {
	const greeting = 'Welcome to the budgets database!';
	res.status(200).json(greeting);
});

server.get('/accounts', async (req, res) => {
	const budgets = await Budgets.find(req.query);
	res.status(200).json(budgets);
});

server.get('/accounts/:id', async (req, res) => {
	const { id } = req.params;
	const budget = await Budgets.findById(id);
	res.status(200).json(budget);
});

server.put('/accounts/:id', async (req, res) => {
	try {
		const budget = await Budgets.update(req.params.id, req.body);
		if (budget) {
			res.status(200).json(budget);
		} else {
			res.status(404).json({ message: 'The budget could not be found' });
		}
	} catch (error) {
		// log error to database
		console.log(error);
		res.status(500).json({
			message: 'Error updating the budget'
		});
	}
});

server.delete('/accounts/:id', async (req, res) => {
	const count = await Budgets.remove(req.params.id);
	if (count > 0) {
		res.status(200).json({ message: 'The budget has been removed' });
	} else {
		res.status(404).json({ message: 'The budget could not be found' });
	}
});

server.post('/accounts', (req, res) => {
	const budget = Budgets.add(req.body);
	res.status(201).json(budget);
});

module.exports = server;
