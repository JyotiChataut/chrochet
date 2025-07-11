import { Router } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';

const router = Router();

// ✅ ONE-TIME ADMIN SETUP (run only once, then disable)
router.post('/create-admin', async (req, res) => {
  const { email, password } = req.body;

  try {
    const existing = await User.findOne({ email });
    if (existing) return res.status(400).json({ msg: 'Admin already exists' });

    const hashed = await bcrypt.hash(password, 10);
    await User.create({ email, password: hashed, isAdmin: true });

    res.status(201).json({ msg: 'Admin created successfully' });
  } catch (err) {
    res.status(500).json({ msg: 'Server error while creating admin' });
  }
});

// ✅ LOGIN ROUTE
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  if (email !== process.env.ADMIN_EMAIL) {
    return res.status(403).json({ msg: 'Unauthorized email' });
  }

  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ msg: 'Invalid credentials' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ msg: 'Invalid credentials' });

    const token = jwt.sign(
      { id: user._id, isAdmin: user.isAdmin },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    res.json({ token });
  } catch (err) {
    console.error('Login error:', err);
    res.status(500).json({ msg: 'Server error during login' });
  }
});

export default router;
