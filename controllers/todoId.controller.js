const Data = require('../model/todoModel');

exports.patchTodos = async (req, res, next) => {
    try {
        const todoItem = await Data.findOne({ _id: req.params.id, username: req.user.username })
        const { title, content } = req.body
        if (!todoItem)
            return res.status(400).send("Access denied!")
        const datas = await Data.updateOne({ _id: todoItem._id }, { title, content })
        if (!datas)
            return res.status(404);

        return res.send(datas);
    } catch (err) {
        next(err)
    }
};

exports.deleteTodos = async (req, res, next) => {
    try {
        const todoItem = await Data.findOne({ _id: req.params.id, username: req.user.username })
        if (!todoItem)
            return res.status(400).send("Access denied!");

        const data = await Data.findByIdAndRemove(req.params.id)
        if (!data) return res.status(404);
        return res.send(data);
    }
    catch (err) {
        next(err)
    }
};