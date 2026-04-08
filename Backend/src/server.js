const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');

// Load environment variables from .env file
dotenv.config();

const app = express();

// Middleware for CORS and JSON body parsing
app.use(cors());
app.use(express.json());

// Route modules for course and enrollment APIs
const courseRoutes = require('./routes/courseRoutes');
const enrollmentRoutes = require('./routes/enrollmentRoutes');

app.use('/api/courses', courseRoutes);
app.use('/api/enrollments', enrollmentRoutes);

// Health check route
app.get('/', (req, res) => {
  res.send('API is running...');
});

const connectDB = require('./config/db');
const PORT = process.env.PORT || 5000;

// Start the server only after successfully connecting to MongoDB
const startServer = async () => {
  try {
    await connectDB();
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error('Failed to start server:', error.message);
    process.exit(1);
  }
};

startServer();