import { sessionsCollection, usersCollection } from '../database/db.js';

export async function verifyToken(req, res, next) {
	const authorization = req.headers.authorization;
	const token = authorization?.replace('Bearer ', '');

	if (!token) {
		return res.sendStatus(401);
	}

	const session = await sessionsCollection.findOne({ token });

	if (!session) {
		return res.sendStatus(401);
	}
	const user = await usersCollection.findOne({
		_id: session.userId,
	});
	if (!user) {
		return res.sendStatus(401);
	}
	delete user.encryptedPassword;

	res.locals.user = user;

	next();
}
