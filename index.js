const express = require("express");
const app = express();

const todoListRoute = require('./Routes/todoList');
const todoListId = require('./Routes/todoListId');

app.use('/todoList', todoListRoute);
app.use('/todoList', todoListId);

app.get("/", (req, res) => {
	res.send("Welcome to the TO-DO Home Page");
});

app.listen(3000, () => console.log("Listening on port 3000..."));
