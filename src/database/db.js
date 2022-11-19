import { MongoClient } from 'mongodb';
import dotenv from 'dotenv';

dotenv.config();

const mongoClient = new MongoClient(process.env.MONGO_URI);

try {
	await mongoClient.connect();
	console.log('MongoDB conectado!');
} catch (err) {
	console.log('Erro ao conectao ao mongo', err.message);
}

const db = mongoClient.db('myWallet');
export const usersCollection = db.collection('users');
export const sessionsCollection = db.collection('sessions');
export const entriesCollection = db.collection('entries');
