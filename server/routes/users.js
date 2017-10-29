import express from "express";
import User from "../models/User";
import bcrypt from 'bcrypt';

const router = express.Router();

//create new user
router.post("/", (req, res) => {
	const { email, password } = req.body;
	const _password = bcrypt.hashSync(password, 10);
	new User({ email: email, password_hash: _password }).save().then();	
});

export default router;