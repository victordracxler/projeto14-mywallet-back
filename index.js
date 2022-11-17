import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import joi from 'joi';
import bcrypt from 'bcrypt';
import { v4 as uuidV4 } from 'uuid';
import { MongoClient, ObjectId } from 'mongodb';

const app = express();
dotenv.config();
app.use(cors());
app.use(express.json());

const mongoClient = new MongoClient(process.env.MONGO_URI);
let db;

try {
	await mongoClient.connect();
} catch (err) {
	console.log('Erro ao conectao ao mongo', err.message);
}

db = mongoClient.db('myWallet');
const usersCollection = db.collection('users');
const sessionsCollection = db.collection('sessions');
const transactionsCollection = db.collection('transactions');

// Routes

const portAddress = 5000;
app.listen(portAddress, () => console.log(`Server running in port ${port}`));
