const Data = require("../model/todoModel");

exports.getTodos = async (req, res, next) => {
	try {
		const data = await Data.find({ 'username': new RegExp(req.user.username, "i") })
		return res.status(200).send(data);
	} catch (err) {
		res.status(404).send("User not found!")
		next(err);
	}
};

exports.postTodos = async (req, res, next) => {
	try {
		const { title, content } = req.body;
		if (!(title && content)) {
			res.status(400).send("All input is required");
		}
		const user = await Data.create({
			title: title,
			content: content,
			username: req.user.username
		});
		return res.status(201).json(user);
	} catch (err) {
		console.log(err);
		next(err)
	}
};

