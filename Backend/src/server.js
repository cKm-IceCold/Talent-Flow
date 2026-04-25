const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const path = require('path');
const cors = require('cors');

dotenv.config({ path: path.resolve(__dirname, '.env') });

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB connection cache for serverless
let cachedConnection = null;

const connectDB = async () => {
  if (cachedConnection) {
    console.log('Using cached MongoDB connection');
    return cachedConnection;
  }

  try {
    const mongoUri = process.env.MONGO_URI || 'mongodb://localhost:27017/talentflow';
    
    if (!mongoUri) {
      throw new Error('MONGO_URI environment variable is not set');
    }

    const connection = await mongoose.connect(mongoUri, {
      maxPoolSize: 10,
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 45000,
    });

    cachedConnection = connection;
    console.log('✓ Connected to MongoDB');
    return connection;
  } catch (error) {
    console.error('✗ MongoDB connection error:', error.message);
    throw error;
  }
};

// Swagger setup
const setupSwagger = require('./utils/swagger');
setupSwagger(app);

// Ensure DB connection before handling requests
app.use(async (req, res, next) => {
  try {
    await connectDB();
    next();
  } catch (error) {
    console.error('Database connection middleware error:', error.message);
    return res.status(503).json({ 
      message: 'Service unavailable - database connection failed',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined 
    });
  }
});

app.get('/', (req, res) => {
  res.json({
    message: 'Talent Flow Backend API is running!',
    version: '1.0.0',
    endpoints: {
      auth: '/api/auth',
      users: '/api/users',
      courses: '/api/courses',
      enrollments: '/api/enrollments',
      assignments: '/api/assignments',
      progress: '/api/progress',
    },
  });
});

require('./models/Module'); // register Module schema

app.use('/api/auth', require('./routes/auth.routes'));
app.use('/api/users', require('./routes/user.routes'));
app.use('/api/courses', require('./routes/courseRoutes'));
app.use('/api/enrollments', require('./routes/enrollmentRoutes'));
app.use('/api/assignments', require('./routes/assignments'));
app.use('/api/progress', require('./routes/progress'));

app.use((err, req, res, next) => {
  console.error('Error handler:', err);
  
  // Mongoose validation errors
  if (err.name === 'ValidationError') {
    return res.status(400).json({ 
      message: 'Validation error',
      errors: Object.values(err.errors).map(e => e.message)
    });
  }

  // Mongoose cast errors
  if (err.name === 'CastError') {
    return res.status(400).json({ 
      message: 'Invalid ID format' 
    });
  }

  // JWT errors
  if (err.name === 'JsonWebTokenError') {
    return res.status(401).json({ 
      message: 'Invalid or expired token' 
    });
  }

  // Default error
  const statusCode = err.statusCode || 500;
  const message = err.message || 'Something went wrong!';
  
  return res.status(statusCode).json({ 
    message,
    ...(process.env.NODE_ENV === 'development' && { error: err.stack })
  });
});

module.exports = app;
