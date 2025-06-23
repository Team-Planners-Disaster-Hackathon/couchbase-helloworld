import express from 'express';
import * as todoController from '../controllers/todoController';

const router = express.Router();

// GET all todos
router.get('/', todoController.getTodos);

// GET todo by ID
router.get('/:id', todoController.getTodoByID);

// POST create new todo
router.post('/', todoController.createNewTodo);

// PUT update todo
router.put('/:id', todoController.updateTodoController);

// DELETE todo
router.delete('/:id', todoController.deleteTodo);

export default router;
