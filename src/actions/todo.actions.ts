// Import types
import { todoModel } from '../models/todo.model';


// Mock implementation of todo actions
export const createTodo = async (data: any) => {
    const todo = new todoModel(data);
    await todo.save();
    return todo;
};

export const getAllTodos = async () => {
    const todos = await todoModel.find();
    return todos;
};

export const getTodoById = async (id: string) => {
    const todos = await todoModel.findById(id);
    return todos;
};

export const updateTodo = async (id: string, data: Partial<any>): Promise<any | null> => {
    const todo = await todoModel.findOneAndUpdate({id: id}, data);
    return todo;
};

export const deleteTodo = async (id: number): Promise<boolean> => {
    const todo = await todoModel.findByIdAndDelete(id);
    return todo;
};