const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

const setupSwagger = require('./utils/swagger');
setupSwagger(app);

// MongoDB connection with caching for serverless
let cachedDb = null;

async function connectToDatabase() {
  if (cachedDb) {
    return cachedDb;
  }
  const connection = await mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/talentflow');
  cachedDb = connection;
  console.log('Connected to MongoDB');
  return cachedDb;
}

// Connect to DB before handling requests
app.use(async (req, res, next) => {
  try {
    await connectToDatabase();
    next();
  } catch (error) {
    console.error('MongoDB connection error:', error);
    res.status(500).json({ message: 'Database connection failed' });
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
  console.error(err.stack);
  res.status(500).json({ message: 'Something went wrong!' });
});

module.exports = app;
