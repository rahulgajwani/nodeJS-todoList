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
			// const user = await User.findOne({ username });
			if (userLogin) {
				const token = jwt.sign(
					{ user_id: userLogin._id, username },
					process.env.TOKEN_KEY,
					{
						expiresIn: "5h",
					}
				);
				userLogin.token = token;
				const userView = {username, id:userLogin._id, token};
				return res.status(200).json(userView);// username token and id to be the res
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
