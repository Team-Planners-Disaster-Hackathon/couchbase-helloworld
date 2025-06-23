import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';

// Import Ottoman initialization
import { initOttoman } from './couchbase/database';

// Load environment variables
dotenv.config();

// Import middleware
import { logger } from './middleware/logger';

// Initialize express app
const app = express();
const PORT = process.env.PORT || 8080;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(logger);

// Serve static files from the public directory
app.use(express.static(path.join(__dirname, '../public')));

// Import routes
import todoRoutes from './routes/todoRoutes';
import healthRoutes from './routes/healthRoutes';

app.use('/api/todos', todoRoutes);
app.use('/api/health', healthRoutes);

// API info route
app.get('/api', (req, res) => {
  res.json({
    message: 'Welcome to the API',
    endpoints: {
      health: '/api/health',
      todos: '/api/todos'
    }
  });
});

// Serve the client application at the root route
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/index.html'));
});

// Start server with Ottoman initialization
const startServer = async () => {
  try {
    // Try to initialize Ottoman connection
    console.log('Attempting to connect to Couchbase...');
    await initOttoman();
    console.log('Successfully connected to Couchbase!');
    
    // Start Express server with Ottoman
    app.listen(PORT, () => {
      console.log(`⚡️ Server is running on port ${PORT} with Couchbase connection`);
    });
  } catch (error) {
    console.warn('Failed to connect to Couchbase:', error);
    console.log('Starting server with mock implementation instead');
    
    // Continue running the server with mock implementation
    app.listen(PORT, () => {
      console.log(`⚡️ Server is running on port ${PORT} (using mock data store)`);
    });
  }
};

// Start the server
startServer();

export default app;
