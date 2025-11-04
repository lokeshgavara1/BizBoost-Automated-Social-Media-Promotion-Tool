// routes/auth.js
const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { body, validationResult } = require('express-validator');
const User = require('../models/User');
const auth = require('../middleware/auth');
const { sendWelcomeEmail } = require('../utils/emailService');

const router = express.Router();

// 🔐 REGISTER endpoint
router.post('/register', [
  body('name').not().isEmpty(),
  body('email').isEmail(),
  body('password').isLength({ min: 6 })
], async (req, res) => {
  console.log('📝 Register attempt:', { email: req.body.email, name: req.body.name });
  
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    console.log('❌ Validation errors:', errors.array());
    return res.status(400).json({ msg: 'Invalid input', errors: errors.array() });
  }

  const { name, email, password } = req.body;

  try {
    let user = await User.findOne({ email });
    if (user) {
      console.log('❌ Email already exists:', email);
      return res.status(409).json({ msg: 'Email already registered' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    user = new User({ name, email, password: hashedPassword });

    await user.save();
    console.log('✅ User registered successfully:', user.email);

    // Send welcome email (non-blocking)
    sendWelcomeEmail(user.email, user.name).catch(err => {
      console.error('Failed to send welcome email:', err);
    });

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1d' });
    console.log('✅ Token generated for:', user.email);
    
    res.status(201).json({ 
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email
      }
    });
  } catch (err) {
    console.error('❌ Register error:', err);
    if (err.code === 11000) {
      return res.status(409).json({ msg: 'Email already registered' });
    }
    res.status(500).json({ msg: 'Server error' });
  }
});

// 🔓 LOGIN endpoint
router.post('/login', [
  body('email').isEmail(),
  body('password').exists()
], async (req, res) => {
  console.log('🔑 Login attempt:', { email: req.body.email });
  
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    console.log('❌ Validation errors:', errors.array());
    return res.status(400).json({ msg: 'Invalid input', errors: errors.array() });
  }

  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      console.log('❌ User not found:', email);
      return res.status(400).json({ msg: 'Invalid credentials' });
    }

    console.log('✅ User found:', email);
    console.log('🔐 Checking password...');
    
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      console.log('❌ Password mismatch for:', email);
      return res.status(400).json({ msg: 'Invalid credentials' });
    }

    console.log('✅ Password matched for:', email);

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1d' });
    console.log('✅ Token generated for:', email);
    
    res.json({ 
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email
      }
    });
  } catch (err) {
    console.error('❌ Login error:', err.message);
    res.status(500).send('Server error');
  }
});

// 🔍 VERIFY TOKEN endpoint
router.get('/verify', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    if (!user) {
      return res.status(404).json({ msg: 'User not found' });
    }
    res.json({ user });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

module.exports = router;
