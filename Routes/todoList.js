const express = require("express");
const router = express.Router();
const Data = require('../model/todoModel');
const bcrypt = require('bcrypt')

router.use(express.json());

router.get('/', (req, res) => {
	Data.find({'username': new RegExp(req.user.username, "i")})
		.then(result => {
			res.send(result);
		})
		.catch(err => {
			console.log(err);
		});
});

router.post("/", async (req, res) => {
	try {
		const { title, content} = req.body;
		if (!(title && content)) {
			res.status(400).send("All input is required");
		}
		const user = await Data.create({
			title: title,
			content: content,
			username: req.user.username
		});
		res.status(201).json(user);
	} catch (err) {
		console.log(err);
	}
});

module.exports = router;