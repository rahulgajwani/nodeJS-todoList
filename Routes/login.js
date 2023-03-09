const express = require("express");
const router = express.Router();
const Data = require('../model/todoModel');
const DataView = require('../model/todoView');
const User = require('../model/users')
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
		const userLogin = await User.findOne({ username });
		if (userLogin.username == username && (await bcrypt.compare(password, userLogin.password))) {
			const user = await Data.findOne({ username });
			if (user) {
				const token = jwt.sign(
					{ user_id: user._id, username },
					process.env.TOKEN_KEY,
					{
						expiresIn: "5h",
					}
				);
				user.token = token;
				const userView = new DataView(user);
				return res.status(200).json(userView);
			}

		}
		else {
			return res.status(404).send("User not found");
		}

	}
	catch {
		return res.status(400).send("Invalid Credentials");
	}
});

module.exports = router;
