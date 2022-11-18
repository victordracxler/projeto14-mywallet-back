import { usersCollection, sessionsCollection } from '../database/db.js';
import { signInSchema, signUpSchema } from '../index.js';

export async function signUp(req, res) {
	const user = req.body;

	try {
		const userExists = await usersCollection.findOne({ email: user.email });

		if (userExists) {
			res.status(401).send({ message: 'Email já cadastrado' });
			return;
		}

		await usersCollection.insertOne(user);

		console.log(user);
		res.sendStatus(200);
	} catch (err) {
		console.log(err);
		res.sendStatus(500);
	}
}
