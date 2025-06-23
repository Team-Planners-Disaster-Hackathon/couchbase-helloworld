import { Request, Response } from 'express';
import { ApiResponse } from '../types';
import { createTodo, getAllTodos, getTodoById, updateTodo as updateTodoAction, deleteTodo as deleteTodoAction } from '../actions/todo.actions';

// GET all todos
export const getTodos = async (req: Request, res: Response) => {
  try {
    const todos = await getAllTodos();
    
    const response: ApiResponse<any[]> = {
      success: true,
      data: todos
    };
    
    res.status(200).json(response);
  } catch (error) {
    console.error('Error getting todos:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to retrieve todos'
    });
  }
};

// GET todo by ID
export const getTodoByID = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    
    const todo = await getTodoById(id);
    
    if (!todo) {
      return res.status(404).json({
        success: false,
        error: 'Todo not found'
      });
    }
    
    const response: ApiResponse<any> = {
      success: true,
      data: todo
    };
    
    res.status(200).json(response);
  } catch (error) {
    console.error('Error getting todo by ID:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to retrieve todo'
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

// PUT update todo
export const updateTodoController = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const { title, description, completed } = req.body;
    
    const todo = await updateTodoAction(id, { title, description, completed });
    
    
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

// DELETE todo
export const deleteTodo = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    
    const success = await deleteTodoAction(id);
    
    if (!success) {
      return res.status(404).json({
        success: false,
        error: 'Todo not found or could not be deleted'
      });
    }
    
    const response: ApiResponse<any> = {
      success: true,
      data: {}
    };
    
    res.status(200).json(response);
  } catch (error) {
    console.error('Error deleting todo:', error);
    res.status(500).json({
      success: false,
      error: 'Server Error'
    });
  }
};
