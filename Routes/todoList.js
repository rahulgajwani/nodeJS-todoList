const express = require("express");
const router = express.Router();
const Data = require('../model/todoModel');
const bcrypt = require('bcrypt')

router.use(express.json());

router.get('/', (req, res) => {
	Data.findById(req.user.user_id)
		.then(result => {
			res.send(result);
		})
		.catch(err => {
			console.log(err);
		});
});

router.post("/", async (req, res) => {
	try {
		const { title, content, password } = req.body;
		if (!(title && content && password)) {
			res.status(400).send("All input is required");
		}
		const encryptedUserPassword = await bcrypt.hash(password, 10);
		const user = await Data.create({
			title: title,
			content: content,
			username: req.user.username,
			password: encryptedUserPassword,
		});
		res.status(201).json(user);
	} catch (err) {
		console.log(err);
	}
});

module.exports = router;