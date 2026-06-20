const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');

dotenv.config();

const app = express();

// Middleware
app.use(express.json());
//app.use(cors());
app.use(cors({
  origin: "*", 
  credentials: true
}));
// Import routes
const authRoutes = require('./routes/authRoutes');
const leadRoutes = require('./routes/leadRoutes');

// Mount routes
app.use('/api/auth', authRoutes);
app.use('/api/leads', leadRoutes);

// MongoDB connection (no deprecated options)
mongoose.connect(process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/crmDB')
  .then(() => console.log('✅ MongoDB connected successfully'))
  .catch(err => console.error('❌ MongoDB connection error:', err));

// Server listen
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
