const express = require("express");
const router = express.Router();
const Data = require('../model/todoModel');
const bcrypt = require('bcrypt')
require('dotenv').config()
const jwt = require("jsonwebtoken");

router.use(express.json());

router.post("/", async (req, res) => {
	try {
		const { username, password } = req.body;
		if (!(username && password)) {
			res.status(400).send("All input is required");
		}
		const user = await Data.findOne({ username });
		if (user && (await bcrypt.compare(password, user.password))) {
			const token = jwt.sign(
				{ user_id: user._id, username },
				process.env.TOKEN_KEY,
				{
					expiresIn: "5h",
				}
			);
			user.token = token;
			return res.status(200).json(user.token);
		}
	}
	catch {
		return res.status(400).send("Invalid Credentials");
	}
});

module.exports = router;
