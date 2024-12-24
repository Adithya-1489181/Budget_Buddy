const express = require('express');
const cors = require('cors');
const sequelize = require('./config/db');
const path = require('path');
const User = require('./models/User');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, '../frontend/public')));

// Test DB Connection
sequelize.authenticate()
  .then(() => console.log('Database connected...'))
  .catch(err => console.log('Error: ' + err));

// Sample Route
app.get('/', (req, res) => {
  res.send('Backend is running!');
});

// API endpoint to handle signup
app.post('/api/signup', async (req, res) => {
  const { firstName, lastName, email, password, confirmPassword } = req.body;

  // Perform server-side validation and handle the signup logic
  if (password !== confirmPassword) {
    return res.status(400).json({ success: false, message: 'Passwords do not match' });
  }

  try {
    // Save the user data to the database
    const newUser = await User.create({ firstName, lastName, email, password });
    res.json({ success: true, message: 'Signup successful', user: newUser });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// API endpoint to handle login
app.post('/api/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    // Find the user by email
    const user = await User.findOne({ where: { email } });

    if (!user) {
      return res.status(400).json({ success: false, message: 'User not found' });
    }

    // Check if the password matches
    if (user.password !== password) {
      return res.status(400).json({ success: false, message: 'Incorrect password' });
    }

    // Login successful
    res.json({ success: true, message: 'Login successful', user });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// Fallback to serve index.html for any other routes (for React Router)
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/public/index.html'));
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

// Synchronize the database schema
sequelize.sync({ force: true }) // Use { force: true } to drop and recreate the table
  .then(() => console.log('Database synced...'))
  .catch(err => console.log('Error: ' + err));
