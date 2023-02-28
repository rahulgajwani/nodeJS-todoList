const express = require("express");
const mongoose = require("mongoose");
mongoose.set("strictQuery", false);
const app = express()
const todoList = require('./Routes/todoList')
const todoListId = require('./Routes/todoListId')
const login = require('./Routes/login')


require('dotenv').config()
const auth = require("./middleware/auth");

app.use(express.json());

mongoose.connect("mongodb+srv://rahul:test123@cluster0.sr69h9x.mongodb.net/todoList?retryWrites=true&w=majority", {
	useNewUrlParser: true, useUnifiedTopology: true
}, (err) => {
	if (err)
		console.log(err)
	else
		console.log('successfully connected')
})

app.use('/todo',auth,todoList);
app.use('/todo',auth,todoListId);
app.use('/login',login)


app.listen(3000, () => {
	console.log('on port 3000')
})

