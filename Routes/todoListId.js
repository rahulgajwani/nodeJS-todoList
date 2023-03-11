const express = require("express");
const router = express.Router();
const Data = require('../model/todoModel');

router.use(express.json());

router.patch('/:id', async (req, res, next) => {
	const todoItem = await Data.findOne({ _id: req.params.id, username: req.user.username })
	const {title, content} = req.body
	if (!todoItem) {
		return res.status(400).send("Access denied!");
	}
	Data.updateOne({_id:todoItem._id}, {title, content})
		.then(result => {
			if (!result) { return res.status(404); }
			return res.send(result);
		})
		.catch(err => next(err));
});

router.delete('/:id', (req, res) => {
	if (req.params.id != req.user.user_id) {
		return res.status(400).send("Access denied!");
	}
	Data.findByIdAndRemove(req.params.id)
		.then(result => {
			if (!result) { return res.status(404); }
			return res.send(result);
		})
		.catch(err => next(err));
})

module.exports = router;
