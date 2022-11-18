import { signUpSchema } from '../index.js';

export async function signUpValidation(req, res, next) {
	const validation = signUpSchema.validate(req.body);

	if (validation.error) {
		console.log(validation.error);
		return res.sendStatus(422);
	}
	next();
}
