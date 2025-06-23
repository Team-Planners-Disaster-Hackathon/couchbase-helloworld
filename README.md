# TypeScript Express API with Couchbase Integration

A RESTful API built with TypeScript, Express, and Node.js that integrates with Couchbase using the Ottoman ODM. This API provides Todo management functionality with a clean, modular architecture.

## Project Structure

```
├── src/
│   ├── actions/      # Business logic and data operations
│   ├── controllers/  # Route controllers
│   ├── couchbase/    # Couchbase and Ottoman configuration
│   ├── middleware/   # Custom middleware
│   ├── models/       # Ottoman data models
│   ├── routes/       # API routes
│   ├── types/        # TypeScript type definitions
│   └── server.ts     # Express app setup
├── .env              # Environment variables
├── package.json      # Project dependencies
└── tsconfig.json     # TypeScript configuration
```

## Available Endpoints

- **Health Check**: `GET /api/health` - Check API health status
- **Todo API**:
  - `GET /api/todos` - Get all todos
  - `GET /api/todos/:id` - Get todo by ID
  - `POST /api/todos` - Create new todo
  - `PUT /api/todos/:id` - Update todo
  - `DELETE /api/todos/:id` - Delete todo
- **Root**: `GET /` - API information and available endpoints

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- Couchbase Server (local or remote)

### Installation

1. Clone the repository
2. Install dependencies:
   ```
   npm install
   ```
3. Create a `.env` file in the root directory with the following variables:
   ```
   NODE_ENV=development
   PORT=8080
   CB_HOST="couchbase://localhost"
   CB_USER="your_username"
   CB_PASSWORD="your_password"
   CB_BUCKET="your_bucket_name"
   ```
   
   Replace the Couchbase credentials with your own. If you're running Couchbase locally with default settings, you can use:
   ```
   CB_HOST="couchbase://localhost"
   CB_USER="Administrator"
   CB_PASSWORD="password"
   CB_BUCKET="default"
   ```

### Development

Run the development server:

```
npm run dev
```

### Building for Production

Build the TypeScript code:

```
npm run build
```

Start the production server:

```
npm start
```

## Couchbase Integration

This API uses Ottoman ODM to interact with Couchbase. The connection is configured in `src/couchbase/database.ts`. The API will attempt to connect to Couchbase on startup using the credentials provided in the `.env` file.

If the Couchbase connection fails, the API will still run but will use a mock implementation for data operations.

## Adding New Features

1. Create a new model in `src/models/`
2. Create corresponding actions in `src/actions/`
3. Create a controller in `src/controllers/`
4. Create routes in `src/routes/`
5. Import and use the routes in `src/server.ts`

## Error Handling

The API includes error handling middleware that catches and formats errors appropriately. All responses follow a consistent format defined in the `ApiResponse` interface.
