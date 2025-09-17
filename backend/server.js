const express = require('express');
const cors = require('cors');
require('dotenv').config();

// Import routes
const authRoutes = require('./routes/authRoutes'); // keep your auth routes as-is
const userRoutes = require('./routes/userRoutes'); // keep your user routes
const toolsRouter = require('./routes/tools');     // SQLite tools route
const booksRouter = require('./routes/books');  
const coursesRouter = require('./routes/courses');   // SQLite books route

const app = express();
app.use(cors());
app.use(express.json());

// Use routes
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/tools', toolsRouter);
app.use('/api/books', booksRouter);
app.use('/api/courses', coursesRouter);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
