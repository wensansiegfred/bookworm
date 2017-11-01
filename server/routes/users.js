import express from "express";
import User from "../models/user";
import bcrypt from 'bcrypt';
import myValidations from '../utils/validations/signup';
import isEmpty from 'lodash/isEmpty';
import jwt from "jsonwebtoken";

const router = express.Router();

function validateEntry(data, entryValidations) {
	let { errors } = entryValidations(data);

	return User.query({
				where: { email: data.email }
			}).fetch().then(user => {
				if (user) {
					errors.email = "Email already exist.";		
				}

				return {
					errors,
					isValid: isEmpty(errors)
				};
			})
}

//create new user
router.post("/", (req, res) => {
	const { email, password } = req.body.user;	
	const _password = bcrypt.hashSync(password, 10);
	validateEntry(req.body.user, myValidations).then(({ errors, isValid }) => {
		if (isValid) {
				new User({ email: email, password_hash: _password }, { hasTimestamps: true }).save()
						.then(user => {					
							res.status(200).json({ "user": { email: user.email, token: jwt.sign({
									email: user.email
							}, "johnrambosecretkey")}});
						}).catch(err => res.status(500).json({ error: err }));
		} else {
			res.status(400).json({errors: errors});
		}
	})
});

export default router;