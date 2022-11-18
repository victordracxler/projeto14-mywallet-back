import { usersCollection, sessionsCollection } from '../database/db.js';
import { signInSchema, signUpSchema } from '../index.js';

export async function signUp(req, res) {
	const user = req.body;

	console.log(user);
	res.sendStatus(200);
}
