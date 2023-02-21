const express = require("express");
const router = express.Router();
const Data = require('../model/todoModel');
const DataView = require('../model/todoView');
const bcrypt = require('bcrypt')
require('dotenv').config()

router.use(express.json());

router.post("/", async (req, res) => {
	try {
		const { username, password } = req.body;
		if (!(username && password)) {
			res.status(400).send("All input is required");
		}
		const user = await Data.findOne({ username });
		if (user && (await bcrypt.compare(password, user.password))) {
			const userView = new DataView(user);
			return res.status(200).json(userView);
		}
	}
	catch {
		return res.status(400).send("Invalid Credentials");
	}
});

module.exports = router;
