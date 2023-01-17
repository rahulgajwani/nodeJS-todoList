const express = require('express');
const router = express.Router();
const todoList = require("../data.json");
const { randomUUID } = require("crypto");
const fs = require("fs");

router.get("/", (req, res) => {
    res.send(todoList);
});

router.use(express.json());

router.post("/", (req, res) => {
    if (
        !req.body.title ||
        !req.body.content ||
        req.body.title.length < 0 ||
        req.body.content.length < 0
    ) {
        res
            .status(400)
            .send(
                "Both Title and Content are required and the length of them should be more than 1 character"
            );
    } else {
        const newId = randomUUID();
        const newItem = Object.assign({
            id: newId,
            title: req.body.title,
            content: req.body.content,
        });
        todoList.push(newItem);

        fs.writeFile("data.json", JSON.stringify(todoList, null, 2), (err) => {
            if (err) {
                console.log("An error has occured");
            } else {
                console.log("Write Success");
            }
        });
        res.send(newItem);
    }
});

module.exports = router;