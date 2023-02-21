const express = require("express");
const router = express.Router();
const Data = require('../model/todoModel');

router.use(express.json());

router.patch('/:id', (req, res) => {
	var findId = { _id: req.params.id };
	Data.updateOne(findId, req.body)
		.then(result => {
			if (!result) { return res.status(404); }
			return res.send(result);
		})
		.catch(err => next(err));
});

router.delete('/:id', (req, res) => {
	Data.findByIdAndRemove(req.params.id)
		.then(result => {
			if (!result) { return res.status(404); }
			return res.send(result);
		})
		.catch(err => next(err));
})

module.exports = router;
