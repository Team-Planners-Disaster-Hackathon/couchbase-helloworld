import { Schema } from 'ottoman';
import { ottoman } from '../couchbase/database';

const todoSchema = new Schema({
    title: String,
    description: String,
    completed: Boolean
});

export const todoModel = ottoman.model('Todo', todoSchema, { collectionName: 'todo' });
