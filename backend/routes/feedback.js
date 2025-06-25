import { Router } from 'express';
import { create, find } from '../models/Feedback';

const router = Router();

// 📬 PUBLIC FEEDBACK SUBMISSION
router.post('/', async (req, res) => {
  const { message, fileName } = req.body;

  if (!message || message.trim() === '') {
    return res.status(400).json({ msg: 'Message is required' });
  }

  try {
    const feedback = await create({
      message,
      fileName: fileName || null,
    });

    res.status(201).json({ msg: 'Feedback submitted successfully', feedback });
  } catch (err) {
    console.error('❌ Error submitting feedback:', err);
    res.status(500).json({ msg: 'Server error' });
  }
});

// 📥 ADMIN: GET ALL FEEDBACKS
router.get('/', async (_req, res) => {
  try {
    const allFeedbacks = await find().sort({ createdAt: -1 });
    res.status(200).json(allFeedbacks);
  } catch (err) {
    console.error('❌ Error fetching feedbacks:', err);
    res.status(500).json({ msg: 'Failed to fetch feedbacks' });
  }
});

export default router;
