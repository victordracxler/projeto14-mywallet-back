import { entriesCollection } from '../database/db.js';

export async function newEntry(req, res) {
	const { amount, description, type } = req.body;
	const user = res.locals.user;

	const date = Date.now();

	try {
		await entriesCollection.insertOne({
			type,
			amount,
			date,
			description,
			userId: user._id,
		});
		res.sendStatus(201);
	} catch (err) {
		console.log(err);
		res.sendStatus(500);
	}
}

export async function getEntries(req, res) {
	const user = res.locals.user;

	try {
		const entries = await entriesCollection
			.find({ userId: user._id })
			.toArray();
		res.send(entries);
	} catch (err) {
		console.log(err);
		res.sendStatus(500);
	}
}
