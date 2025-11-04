const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db'); // assuming you have a db.js for MongoDB connection
const fs = require('fs');
require('dotenv').config({ path: './config.env' });

const app = express();

// Enable CORS
app.use(cors());

connectDB();

app.use(express.json());
app.use('/api/auth', require('./routes/auth')); // Mount your auth routes here
app.use('/api/auth', require('./routes/googleAuth')); // Mount Google OAuth routes
app.use('/api/auth', require('./routes/instagramAuth')); // Mount Instagram OAuth routes
app.use('/api/auth', require('./routes/facebookAuth')); // Mount Facebook OAuth routes
app.use('/api/auth', require('./routes/linkedinAuth')); // Mount LinkedIn OAuth routes
app.use('/api/business-profile', require('./routes/businessProfile')); // Mount business profile routes
app.use('/api', require('./routes/aiContent')); // Mount AI content generation routes
app.use('/api/posts', require('./routes/posts'));
app.use('/api/analytics', require('./routes/analytics'));
app.use('/api/user', require('./routes/user'));
app.use('/api/campaigns', require('./routes/campaigns'));

// Create uploads directory if it doesn't exist
const uploadsDir = './uploads';
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir);
}

// Serve uploaded files statically
app.use('/uploads', express.static('uploads'));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
