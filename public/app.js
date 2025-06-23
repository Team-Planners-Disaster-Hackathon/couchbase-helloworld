document.addEventListener('DOMContentLoaded', () => {
    // API endpoints
    const API_URL = '/api/todos';
    const HEALTH_URL = '/api/health';
    
    // DOM elements
    const todoForm = document.getElementById('todo-form');
    const todoTitleInput = document.getElementById('todo-title');
    const todoDescriptionInput = document.getElementById('todo-description');
    const todosContainer = document.getElementById('todos-container');
    const todoTemplate = document.getElementById('todo-template');
    const connectionStatus = document.getElementById('connection-status');
    const refreshBtn = document.getElementById('refresh-btn');
    
    // Check API connection
    async function checkConnection() {
        try {
            const response = await fetch(HEALTH_URL);
            if (response.ok) {
                connectionStatus.textContent = 'Connected';
                connectionStatus.classList.add('connection-online');
                connectionStatus.classList.remove('connection-offline');
                return true;
            } else {
                throw new Error('API health check failed');
            }
        } catch (error) {
            connectionStatus.textContent = 'Offline';
            connectionStatus.classList.add('connection-offline');
            connectionStatus.classList.remove('connection-online');
            console.error('API connection error:', error);
            return false;
        }
    }
    
    // Fetch all todos
    async function fetchTodos() {
        todosContainer.innerHTML = `
            <div class="d-flex justify-content-center">
                <div class="spinner-border text-primary" role="status">
                    <span class="visually-hidden">Loading...</span>
                </div>
            </div>
        `;
        
        try {
            const response = await fetch(API_URL);
            if (!response.ok) throw new Error('Failed to fetch todos');
            
            const data = await response.json();
            
            if (data.success && Array.isArray(data.data)) {
                renderTodos(data.data);
            } else {
                throw new Error('Invalid data format');
            }
        } catch (error) {
            todosContainer.innerHTML = `
                <div class="alert alert-danger">
                    <i class="bi bi-exclamation-triangle-fill me-2"></i>
                    Failed to load todos: ${error.message}
                </div>
                <button id="retry-btn" class="btn btn-outline-primary">Retry</button>
            `;
            
            document.getElementById('retry-btn').addEventListener('click', fetchTodos);
            console.error('Error fetching todos:', error);
        }
    }
    
    // Render todos
    function renderTodos(todos) {
        if (todos.length === 0) {
            todosContainer.innerHTML = `
                <div class="text-center py-4">
                    <i class="bi bi-check2-all fs-1 text-muted"></i>
                    <p class="mt-2 text-muted">No todos yet. Add one above!</p>
                </div>
            `;
            return;
        }
        
        todosContainer.innerHTML = '';
        
        todos.forEach(todo => {
            const todoElement = todoTemplate.content.cloneNode(true);
            const todoItem = todoElement.querySelector('.todo-item');
            
            todoItem.dataset.id = todo.id;
            todoElement.querySelector('.todo-title').textContent = todo.title;
            todoElement.querySelector('.todo-description').textContent = todo.description || 'No description';
            
            const checkbox = todoElement.querySelector('.todo-complete');
            checkbox.checked = todo.completed;
            
            if (todo.completed) {
                todoItem.classList.add('completed-todo');
            }
            
            // Format date
            const date = todo.createdAt ? new Date(todo.createdAt) : new Date();
            todoElement.querySelector('.todo-date').textContent = `Created: ${date.toLocaleString()}`;
            
            // Add event listeners
            checkbox.addEventListener('change', () => toggleTodoComplete(todo.id, checkbox.checked));
            todoElement.querySelector('.todo-delete').addEventListener('click', () => deleteTodo(todo.id));
            
            todosContainer.appendChild(todoElement);
        });
    }
    
    // Create a new todo
    async function createTodo(title, description) {
        try {
            const response = await fetch(API_URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    title,
                    description,
                    completed: false
                })
            });
            
            if (!response.ok) throw new Error('Failed to create todo');
            
            const data = await response.json();
            if (data.success && data.data) {
                // Add the new todo to the UI immediately
                const newTodo = data.data;
                const todoElement = todoTemplate.content.cloneNode(true);
                const todoItem = todoElement.querySelector('.todo-item');
                
                todoItem.dataset.id = newTodo.id;
                todoElement.querySelector('.todo-title').textContent = newTodo.title;
                todoElement.querySelector('.todo-description').textContent = newTodo.description || 'No description';
                
                const checkbox = todoElement.querySelector('.todo-complete');
                checkbox.checked = newTodo.completed || false;
                
                // Format date
                const date = newTodo.createdAt ? new Date(newTodo.createdAt) : new Date();
                todoElement.querySelector('.todo-date').textContent = `Created: ${date.toLocaleString()}`;
                
                // Add event listeners
                checkbox.addEventListener('change', () => toggleTodoComplete(newTodo.id, checkbox.checked));
                todoElement.querySelector('.todo-delete').addEventListener('click', () => deleteTodo(newTodo.id));
                
                // Check if the container is empty (showing the "No todos yet" message)
                if (todosContainer.querySelector('.text-center')) {
                    todosContainer.innerHTML = '';
                }
                
                // Add the new todo to the top of the list
                todosContainer.insertBefore(todoElement, todosContainer.firstChild);
                
                return true;
            } else {
                throw new Error(data.error || 'Unknown error');
            }
        } catch (error) {
            console.error('Error creating todo:', error);
            alert(`Failed to create todo: ${error.message}`);
            return false;
        }
    }
    
    // Toggle todo complete status
    async function toggleTodoComplete(id, completed) {
        try {
            const response = await fetch(`${API_URL}/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ completed })
            });
            
            if (!response.ok) {
                throw new Error('Failed to update todo');
            }
            
            const todoItem = document.querySelector(`.todo-item[data-id="${id}"]`);
            if (completed) {
                todoItem.classList.add('completed-todo');
            } else {
                todoItem.classList.remove('completed-todo');
            }
        } catch (error) {
            console.error('Error updating todo:', error);
            alert(`Failed to update todo: ${error.message}`);
            fetchTodos(); // Refresh to get current state
        }
    }
    
    // Delete a todo
    async function deleteTodo(id) {
        if (!confirm('Are you sure you want to delete this todo?')) return;
        
        try {
            const response = await fetch(`${API_URL}/${id}`, {
                method: 'DELETE'
            });
            
            if (!response.ok) throw new Error('Failed to delete todo');
            
            const todoItem = document.querySelector(`.todo-item[data-id="${id}"]`);
            todoItem.classList.add('fade-out');
            
            setTimeout(() => {
                fetchTodos();
            }, 300);
        } catch (error) {
            console.error('Error deleting todo:', error);
            alert(`Failed to delete todo: ${error.message}`);
        }
    }
    
    // Event listeners
    todoForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const title = todoTitleInput.value.trim();
        const description = todoDescriptionInput.value.trim();
        
        if (!title) return;
        
        const success = await createTodo(title, description);
        if (success) {
            todoTitleInput.value = '';
            todoDescriptionInput.value = '';
        }
    });
    
    refreshBtn.addEventListener('click', () => {
        refreshBtn.classList.add('spin');
        checkConnection().then(connected => {
            if (connected) fetchTodos();
            setTimeout(() => refreshBtn.classList.remove('spin'), 500);
        });
    });
    
    // Initialize
    checkConnection().then(connected => {
        if (connected) fetchTodos();
    });
});
