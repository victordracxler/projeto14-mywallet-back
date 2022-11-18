import { usersCollection } from '../database/db.js';
import { signInSchema, signUpSchema } from '../index.js';

export async function signUpValidation(req, res, next) {
	const validation = signUpSchema.validate(req.body, { abortEarly: false });

	if (validation.error) {
		const errors = validation.error.details.map((detail) => detail.message);
		res.status(422).send(errors);
		return;
	}

	const userExists = await usersCollection.findOne({ email: req.body.email });

	if (userExists) {
		res.status(401).send({ message: 'Email já cadastrado' });
		return;
	}
	next();
}

export async function signInValidation(req, res, next) {
	const user = req.body;
	const validation = signInSchema.validate(user, { abortEarly: false });

	if (validation.error) {
		const errors = validation.error.details.map((detail) => detail.message);
		res.status(422).send(errors);
		return;
	}

	const userExists = await usersCollection.findOne({ email: user.email });

	if (!userExists) {
		res.status(401).send({ message: 'Email não cadastrado' });
		return;
	}

	next();
}
