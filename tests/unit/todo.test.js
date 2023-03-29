const todo = require('../../controllers/todo.controller');
const todoId = require('../../controllers/todoId.controller');
const TodoModel = require("../../model/todoModel");
const httpMocks = require("node-mocks-http");
// const newTodo = require("../mock-data/new-todo.json");
const allTodos = require("../mock-data/all-todos.json");

jest.mock("../../model/todoModel")

let req, res, next;

describe("todo.getTodos", () => {
    it("should return response with status 200 and all todos for Gabriel", async () => {
        req = httpMocks.createRequest({
            user: {
                username: "Gabriel"
            }
        });
        res = httpMocks.createResponse();
        next = jest.fn();
        TodoModel.find.mockResolvedValue(allTodos);
        await todo.getTodos(req, res, next);
        expect(res.statusCode).toBe(200);
        expect(res.send.length).toBeGreaterThan(0);
    });
    it("should handle errors in getTodos", async () => {
        req = httpMocks.createRequest({
            user: {
                username: "Raju"
            }
        });
        res = httpMocks.createResponse();
        next = jest.fn();
        const errorMessage = { message: "Error finding" };
        const rejectedPromise = Promise.reject(errorMessage);
        TodoModel.find.mockReturnValue(rejectedPromise);
        await todo.getTodos(req, res, next);
        expect(next).toHaveBeenCalledWith(errorMessage);
    });
});

describe("todo.postTodos", () => {
    it("should return the todo for given user Gabriel", async () => {
        let newTodo = {
            title: "wash",
            content: "bags"
        }
        req = httpMocks.createRequest({
            user: {
                username: "Gabriel"
            },
            body: newTodo
        });
        res = httpMocks.createResponse();
        next = jest.fn();
        TodoModel.create.mockResolvedValue(newTodo);
        await todo.postTodos(req, res, next);
        expect(res.statusCode).toBe(201);
        expect(res.send.length).toBeGreaterThan(0);
    })
    it("should handle errors", async () => {
        let newTodo = {
            title: "washes",
            content: "bags"
        }
        req = httpMocks.createRequest({
            user: {
                username: "Gabriel"
            },
            body: newTodo
        });
        res = httpMocks.createResponse();
        next = jest.fn();
        const errorMessage = { message: "Done property missing" };
        const rejectedPromise = Promise.reject(errorMessage);
        TodoModel.create.mockReturnValue(rejectedPromise);
        await todo.postTodos(req, res, next);
        expect(next).toBeCalledWith(errorMessage);
      });
})

describe("TodoController.patchTodo", () => {
    it("should call findOne and Update", async () => {
        let todo = {
            _id: "63fb5ff4b71d93531e7a8c45",
            title: "Bike",
            content: "Polish",
            username: "Gabriel"
        }
        req = httpMocks.createRequest({
            user: {
                username: "Gabriel"
            }
        });
        res = httpMocks.createResponse();
        next = jest.fn();
        TodoModel.findOne.mockResolvedValue(todo);
        TodoModel.updateOne.mockResolvedValue(todo);
        req.params.todoId = '63fb5ff4b71d93531e7a8c45';
        await todoId.patchTodos(req, res, next);
        expect(res.statusCode).toBe(200);
    });
    it("should handle errors", async () => {
        let todo = {
            _id: "63fb5ff4b71d93531e7a8c45",
            title: "Bikerr",
            content: "Polishhh",
            username: "Gabriel"
        }
        req = httpMocks.createRequest({
            user: {
                username: "Gabriel"
            }
        });
        res = httpMocks.createResponse();
        next = jest.fn();
        const errorMessage = { message: "Access denied!" };
        const rejectedPromise = Promise.reject(errorMessage);
        TodoModel.findOne.mockReturnValue(todo);
        TodoModel.updateOne.mockReturnValue(rejectedPromise);
        req.params.todoId = '63fb5ff4b71d93531e7a8c45';
        await todoId.patchTodos(req, res, next);
        expect(next).toBeCalledWith(errorMessage);
      });
});

describe("TodoController.deleteTodo", () => {
    it("should call findByIdAndDelete", async () => {
        let todo = {
            _id: "63fb5ff4b71d93531e7a8c45",
            title: "Bike",
            content: "Polish",
            username: "Gabriel"
        }
        req = httpMocks.createRequest({
            user: {
                username: "Gabriel"
            }
        });
        res = httpMocks.createResponse();
        next = jest.fn();
        TodoModel.findOne.mockResolvedValue(todo);
        TodoModel.findByIdAndRemove.mockResolvedValue(todo);
        req.params.todoId = '63fb5ff4b71d93531e7a8c45';
        await todoId.deleteTodos(req, res, next);
        expect(res.statusCode).toBe(200);
    });
    it("should handle errors", async () => {
        let todo = {
            _id: "63fb5ff4b71d93531e7a8c45",
            title: "Bike",
            content: "Polish",
            username: "Gabriel"
        }
        req = httpMocks.createRequest({
            user: {
                username: "Gabriel"
            }
        });
        res = httpMocks.createResponse();
        next = jest.fn();
        const errorMessage = { message: "Error deleting" };
        const rejectedPromise = Promise.reject(errorMessage);
        TodoModel.findOne.mockReturnValue(todo);
        TodoModel.findByIdAndRemove.mockReturnValue(rejectedPromise);
        await todoId.deleteTodos(req, res, next);
        expect(next).toHaveBeenCalledWith(errorMessage);
    });
})



