import { Router } from 'express';
import jwt from 'jsonwebtoken';
import Feedback from '../models/Feedback.js';

const router = Router();

// 🔐 Middleware to verify JWT token
function auth(req, res, next) {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(401).json({ msg: 'No token provided' });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (!decoded.isAdmin) throw new Error();
    req.user = decoded;
    next();
  } catch {
    return res.status(403).json({ msg: 'Access forbidden' });
  }
}

// ✅ GET /api/admin/feedbacks - Admin only
router.get('/feedbacks', auth, async (req, res) => {
  try {
    const feedbacks = await Feedback.find().sort({ createdAt: -1 });
    res.json({ feedbacks });
  } catch (err) {
    res.status(500).json({ msg: 'Server error' });
  }
});

export default router;
