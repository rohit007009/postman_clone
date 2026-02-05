import express from 'express';

const router = express.Router();

// Sample users data
const users = [
  { id: 1, name: 'John Doe', email: 'john@example.com', role: 'admin' },
  { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'user' },
  { id: 3, name: 'Bob Johnson', email: 'bob@example.com', role: 'user' }
];

// Sample posts data
const posts = [
  { id: 1, title: 'First Post', content: 'This is the first post', author: 'John Doe' },
  { id: 2, title: 'Second Post', content: 'This is the second post', author: 'Jane Smith' }
];

// GET - Simple response
router.get('/simple', (req, res) => {
  res.json({
    success: true,
    message: 'GET request successful',
    timestamp: new Date().toISOString()
  });
});

// GET - With query parameters
router.get('/query', (req, res) => {
  res.json({
    success: true,
    message: 'Query parameters received',
    queryParams: req.query,
    timestamp: new Date().toISOString()
  });
});

// GET - Users list
router.get('/users', (req, res) => {
  const { role, limit } = req.query;
  let filteredUsers = users;
  
  if (role) {
    filteredUsers = filteredUsers.filter(user => user.role === role);
  }
  
  if (limit) {
    filteredUsers = filteredUsers.slice(0, parseInt(limit));
  }
  
  res.json({
    success: true,
    count: filteredUsers.length,
    data: filteredUsers
  });
});

// GET - Single user by ID
router.get('/users/:id', (req, res) => {
  const user = users.find(u => u.id === parseInt(req.params.id));
  
  if (!user) {
    return res.status(404).json({
      success: false,
      message: 'User not found'
    });
  }
  
  res.json({
    success: true,
    data: user
  });
});

// POST - Create user
router.post('/users', (req, res) => {
  const { name, email, role } = req.body;
  
  if (!name || !email) {
    return res.status(400).json({
      success: false,
      message: 'Name and email are required'
    });
  }
  
  const newUser = {
    id: users.length + 1,
    name,
    email,
    role: role || 'user'
  };
  
  users.push(newUser);
  
  res.status(201).json({
    success: true,
    message: 'User created successfully',
    data: newUser
  });
});

// PUT - Update user
router.put('/users/:id', (req, res) => {
  const userId = parseInt(req.params.id);
  const userIndex = users.findIndex(u => u.id === userId);
  
  if (userIndex === -1) {
    return res.status(404).json({
      success: false,
      message: 'User not found'
    });
  }
  
  const { name, email, role } = req.body;
  users[userIndex] = {
    ...users[userIndex],
    ...(name && { name }),
    ...(email && { email }),
    ...(role && { role })
  };
  
  res.json({
    success: true,
    message: 'User updated successfully',
    data: users[userIndex]
  });
});

// DELETE - Delete user
router.delete('/users/:id', (req, res) => {
  const userId = parseInt(req.params.id);
  const userIndex = users.findIndex(u => u.id === userId);
  
  if (userIndex === -1) {
    return res.status(404).json({
      success: false,
      message: 'User not found'
    });
  }
  
  const deletedUser = users.splice(userIndex, 1)[0];
  
  res.json({
    success: true,
    message: 'User deleted successfully',
    data: deletedUser
  });
});

// GET - Posts
router.get('/posts', (req, res) => {
  res.json({
    success: true,
    count: posts.length,
    data: posts
  });
});

// POST - Create post
router.post('/posts', (req, res) => {
  const { title, content, author } = req.body;
  
  if (!title || !content) {
    return res.status(400).json({
      success: false,
      message: 'Title and content are required'
    });
  }
  
  const newPost = {
    id: posts.length + 1,
    title,
    content,
    author: author || 'Anonymous',
    createdAt: new Date().toISOString()
  };
  
  posts.push(newPost);
  
  res.status(201).json({
    success: true,
    message: 'Post created successfully',
    data: newPost
  });
});

// Test different status codes
router.get('/status/:code', (req, res) => {
  const statusCode = parseInt(req.params.code);
  res.status(statusCode).json({
    statusCode,
    message: `Response with status code ${statusCode}`
  });
});

// Delayed response (for testing loading states)
router.get('/delay/:seconds', (req, res) => {
  const seconds = parseInt(req.params.seconds) || 1;
  setTimeout(() => {
    res.json({
      success: true,
      message: `Response delayed by ${seconds} seconds`,
      timestamp: new Date().toISOString()
    });
  }, seconds * 1000);
});

// Echo request details
router.all('/echo', (req, res) => {
  res.json({
    method: req.method,
    headers: req.headers,
    query: req.query,
    body: req.body,
    timestamp: new Date().toISOString()
  });
});

export default router;
