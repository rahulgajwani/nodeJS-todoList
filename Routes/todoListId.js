const express = require('express');
const router = express.Router();
const todoList = require("../data.json");
const fs = require("fs");

// Git, mongoDB, class or function


router.get("/:id", (req, res) => {
    const todoItem = todoList.find((t) => t.id === req.params.id);
    if (!todoItem)
        return res
            .status(404)
            .send("The todo item with the given id was not found");
    res.send(todoItem);
});

router.patch("/:id", (req, res) => {
    const todoItem = todoList.find((t) => t.id === req.params.id);
    if (todoItem) {
        let index = todoList.indexOf(todoItem);
        Object.assign(todoItem, req.body);
        todoList[index] = todoItem;
        fs.writeFile("data.json", JSON.stringify(todoList, null, 2), (err) => {
            if (err) {
                console.log("An error has occured");
            } else {
                console.log("Update Success");
            }
        });
        res.send(todoItem);
    } else
        res.status(404).send("The todo item with the given id was not found");
});

router.delete("/:id", (req, res) => {
    const todoItem = todoList.find((t) => t.id === req.params.id);
    if (todoItem) {
        const index = todoList.indexOf(todoItem);
        todoList.splice(index, 1);
        fs.writeFile("data.json", JSON.stringify(todoList, null, 2), (err) => {
            if (err) {
                console.log("An error has occured");
            } else {
                console.log("Delete Success");
            }
        });
        res.send(todoItem);
    } else res.status(404).send("The todo item with the given id was not found");
});

module.exports = router;