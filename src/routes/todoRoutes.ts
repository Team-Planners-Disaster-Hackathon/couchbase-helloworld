import express from 'express';
import * as productController from '../controllers/todoController';

const router = express.Router();

// GET all products
router.get('/', productController.getTodos);

// GET product by ID
router.get('/:id', productController.getTodoByID);

// POST create new product
router.post('/', productController.createNewTodo);

// PUT update product
router.put('/:id', productController.updateProduct);

// DELETE product
router.delete('/:id', productController.deleteProduct);

export default router;
