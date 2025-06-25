import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';

// Load env variables
dotenv.config();

// Import routes using ES modules
import authRoutes from './routes/auth.js';
import feedbackRoutes from './routes/feedback.js';
import adminRoutes from './routes/admin.js';

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);              // For admin login
app.use('/api/feedbacks', feedbackRoutes);     // Public feedback form
app.use('/api/admin', adminRoutes);            // Protected admin route

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('✅ MongoDB connected');
    app.listen(process.env.PORT, () => {
      console.log(`🚀 Server running at http://localhost:${process.env.PORT}`);
    });
  })
  .catch((err) => {
    console.error('❌ MongoDB connection failed:', err);
  });
