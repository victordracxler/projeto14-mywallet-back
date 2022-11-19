import { usersCollection, sessionsCollection } from '../database/db.js';
import { signInSchema, signUpSchema } from '../index.js';
import bcrypt from 'bcrypt';
import { v4 as uuidV4 } from 'uuid';
import { ObjectId } from 'mongodb';

export async function signUp(req, res) {
	const { username, email, password } = req.body;

	try {
		const encryptedPassword = bcrypt.hashSync(password, 10);
		const user = {
			username,
			email,
			encryptedPassword,
		};

		await usersCollection.insertOne(user);

		console.log(user);
		res.sendStatus(200);
	} catch (err) {
		console.log(err);
		res.sendStatus(500);
	}
}

export async function signIn(req, res) {
	const { email, password } = req.body;

	try {
		const user = await usersCollection.findOne({ email });
		console.log(user);

		if (user && bcrypt.compareSync(password, user.encryptedPassword)) {
			const token = uuidV4();

			const sessionExists = await sessionsCollection.findOne({
				userId: ObjectId(user._id),
			});
			if (sessionExists) {
				await sessionsCollection.deleteOne({
					userId: ObjectId(user._id),
				});
			}

			await sessionsCollection.insertOne({
				userId: user._id,
				token,
			});
			delete user.encryptedPassword;

			res.send({ username: user.username, token });
		} else {
			res.status(422).send({ message: 'senha incorreta' });
		}
	} catch (err) {
		console.log(err);
		res.sendStatus(500);
	}
}
