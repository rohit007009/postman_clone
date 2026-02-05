# Postman Clone - Backend API

A Node.js/Express backend server for testing API requests with the Postman Clone frontend.

## Features

- RESTful API endpoints for testing GET, POST, PUT, DELETE requests
- CORS enabled for frontend integration
- Sample endpoints for users and posts
- Query parameter handling
- Request body parsing
- Error handling middleware
- Development logging with Morgan

## Installation

1. Navigate to the backend directory:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file (already created with defaults):
```env
PORT=5000
FRONTEND_URL=http://localhost:5173
NODE_ENV=development
```

## Running the Server

### Development mode (with auto-reload):
```bash
npm run dev
```

### Production mode:
```bash
npm start
```

The server will start on `http://localhost:5000`

## API Endpoints

### Root
- `GET /` - API information and available endpoints

### Test Endpoints

#### Simple GET Request
- `GET /api/test/simple` - Returns a simple JSON response

#### Query Parameters
- `GET /api/test/query?key=value&another=test` - Echoes back query parameters

#### Users CRUD
- `GET /api/test/users` - Get all users
- `GET /api/test/users?role=admin` - Filter users by role
- `GET /api/test/users?limit=2` - Limit number of results
- `GET /api/test/users/:id` - Get user by ID
- `POST /api/test/users` - Create new user
  ```json
  {
    "name": "John Doe",
    "email": "john@example.com",
    "role": "user"
  }
  ```
- `PUT /api/test/users/:id` - Update user
  ```json
  {
    "name": "Updated Name",
    "email": "newemail@example.com"
  }
  ```
- `DELETE /api/test/users/:id` - Delete user

#### Posts
- `GET /api/test/posts` - Get all posts
- `POST /api/test/posts` - Create new post
  ```json
  {
    "title": "My Post",
    "content": "Post content here",
    "author": "Author Name"
  }
  ```

#### Utility Endpoints
- `GET /api/test/status/:code` - Test different HTTP status codes (e.g., `/api/test/status/404`)
- `GET /api/test/delay/:seconds` - Delayed response for testing loading states
- `ALL /api/test/echo` - Echoes back request details (method, headers, query, body)

## Testing with Postman Clone

1. Start the backend server: `npm run dev`
2. Start the frontend: `cd .. && npm run dev`
3. Open the frontend at `http://localhost:5173`
4. Try these example requests:

### Example 1: GET Request
```
Method: GET
URL: http://localhost:5000/api/test/users
```

### Example 2: POST Request
```
Method: POST
URL: http://localhost:5000/api/test/users
Headers: Content-Type: application/json
Body:
{
  "name": "Test User",
  "email": "test@example.com",
  "role": "user"
}
```

### Example 3: Query Parameters
```
Method: GET
URL: http://localhost:5000/api/test/users?role=admin&limit=2
```

## Project Structure

```
backend/
├── server.js              # Main server file
├── package.json           # Dependencies and scripts
├── .env                   # Environment variables
├── routes/
│   └── testRoutes.js      # API test routes
└── middleware/
    └── errorHandler.js    # Error handling middleware
```

## Dependencies

- **express** - Web framework
- **cors** - Enable CORS
- **dotenv** - Environment variables
- **morgan** - HTTP request logger
- **nodemon** (dev) - Auto-restart server on changes

## Notes

- All endpoints return JSON responses
- CORS is configured to allow requests from the frontend
- Sample data is stored in memory (resets on server restart)
- Error responses follow consistent format with `success: false`
