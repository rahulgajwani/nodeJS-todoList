const express = require("express");
const router = express.Router();
const todoController = require("../controllers/todoId.controller");

router.use(express.json());
router.patch("/:id", todoController.patchTodos);
router.delete('/:id', todoController.deleteTodos);

module.exports = router;
