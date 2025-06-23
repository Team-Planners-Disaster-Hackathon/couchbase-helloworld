import { Request, Response } from 'express';
import {  ApiResponse} from '../types';
import { createTodo, getAllTodos, getTodoById, updateTodo } from '../actions/todo.actions';

// GET all products
export const getTodos = async (req: Request, res: Response) => {
  try {
    // Mock data for demonstration
   const todos = await getAllTodos();
    
    res.status(200).json(todos.rows);
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Server Error'
    });
  }
};

// GET product by ID
export const getTodoByID = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    
    // Mock data for demonstration
    const todo = await getTodoById(id)
    
    const response: ApiResponse<any> = {
      success: true,
      data: todo
    };
    
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Server Error'
    });
  }
};

// POST create new product
export const createNewTodo = async (req: Request, res: Response) => {
  try {
    const { title, description } = req.body;
    
    // Validation
    if (!title || !description) {
      return res.status(400).json({
        success: false,
        error: 'Please provide title and description'
      });
    }

    const todo = await createTodo({ title, description, completed: false });
    
    const response: ApiResponse<any> = {
      success: true,
      data: todo
    };
    
    res.status(201).json(response);
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Server Error'
    });
  }
};

// PUT update product
export const updateProduct = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const { title, description, completed } = req.body;
    
    const todo = await updateTodo(id, { title, description, completed });
    
    
    const response = {
      success: true,
      data: todo
    };
    
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Server Error'
    });
  }
};

// DELETE product
export const deleteProduct = (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id);
    
    // Mock response for demonstration
    res.status(200).json({
      success: true,
      data: {}
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Server Error'
    });
  }
};
