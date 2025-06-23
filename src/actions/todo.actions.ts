// Import types
import { todoModel } from '../models/todo.model';


// Mock implementation of todo actions
export const createTodo = async (data: any) => {
    const todo = new todoModel(data);
    await todo.save();
    return todo;
};

export const getAllTodos = async () => {
    try {
        const result = await todoModel.find({});
        return result.rows || [];
    } catch (error) {
        console.error('Error getting all todos:', error);
        return [];
    }
};

export const getTodoById = async (id: string) => {
    try {
        const todo = await todoModel.findById(id);
        return todo || null;
    } catch (error) {
        console.error(`Error getting todo by ID ${id}:`, error);
        return null;
    }
};

export const updateTodo = async (id: string, data: Partial<any>): Promise<any | null> => {
    try {
        const todo = await todoModel.findById(id);
        if (!todo) return null;
        
        // Only update properties that are provided in the data parameter
        Object.keys(data).forEach(key => {
            if (data[key] !== undefined) {
                todo[key] = data[key];
            }
        });
        
        await todo.save();
        return todo;
    } catch (error) {
        console.error(`Error updating todo ${id}:`, error);
        return null;
    }
};

export const deleteTodo = async (id: number | string): Promise<boolean> => {
    try {
        // Convert number to string if needed since findById expects a string
        const todoId = typeof id === 'number' ? id.toString() : id;
        
        // First try to find the document to make sure it exists
        const todo = await todoModel.findById(todoId);
        if (!todo) return false;
        
        // Use removeById which is more reliable than the instance method
        await todoModel.removeById(todoId);
        return true;
    } catch (error) {
        console.error(`Error deleting todo ${id}:`, error);
        return false;
    }
};