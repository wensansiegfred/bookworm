import express from "express";
import User from "../models/User";
import bcrypt from 'bcrypt';
import jwt from "jsonwebtoken";

const router = express.Router();

router.post("/", (req, res) => {
	const { credentials } = req.body;
	User.query({
		where: { email: credentials.email }
	}).fetch().then(user => {		
		if (user && bcrypt.compareSync(credentials.password, user.get('password_hash'))) {//if it returns a user object && correct password
			res.status(200).json({ "user": { email: user.get("email"), token: jwt.sign({
				email: user.get("email")
			}, "johnrambosecretkey")}});	
		} else {
			res.status(400).json({ errors: { global: "Invalid credentials" } });
		}
	});
});

export default router;