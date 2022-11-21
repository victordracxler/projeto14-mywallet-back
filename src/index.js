import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import joi from 'joi';
dotenv.config();

// import controllers and routers
import authRouters from './routes/authRoutes.js';
import entryRouters from './routes/entryRoutes.js';

// Config
const app = express();
app.use(cors());
app.use(express.json());

app.use(authRouters);
app.use(entryRouters);

//joi

export const signInSchema = joi.object({
	email: joi.string().email().required().min(3),
	password: joi.string().required().min(6),
});

export const signUpSchema = joi.object({
	username: joi.string().required().min(3),
	password: joi.string().required().min(6),
	repeatPassword: joi
		.any()
		.equal(joi.ref('password'))
		.required()
		.label('Confirm password')
		.messages({ 'any.only': '{{#label}} does not match' }),
	email: joi.string().email().required(),
});

export const entrySchema = joi.object({
	amount: joi.number().required(),
	description: joi.string().required().min(3),
	type: joi.string().valid('in', 'out').required(),
});

const portAddress = 5000;
app.listen(process.env.PORT, () =>
	console.log('Server running in port' + process.env.PORT)
);
