import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import joi from 'joi';
dotenv.config();

// import controllers and routers
import authRouters from './routes/authRoutes.js';

// Config
const app = express();
app.use(cors());
app.use(express.json());

app.use(authRouters);

//joi

export const signInSchema = joi.object({
	username: joi.string().required().min(3),
	password: joi.string().required().min(6),
});

export const signUpSchema = joi.object({
	username: joi.string().required().min(3),
	password: joi.string().required().min(6),
	repeat_password: joi.ref('password'),
	email: joi.string().required(),
});

const portAddress = 5000;
app.listen(portAddress, () =>
	console.log(`Server running in port ${portAddress}`)
);
