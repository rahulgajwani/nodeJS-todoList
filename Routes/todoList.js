const express = require("express");
const router = express.Router();
const todoController = require("../controllers/todo.controller");

router.use(express.json());

router.get("/", todoController.getTodos);
router.post("/", todoController.postTodos);

module.exports = router;