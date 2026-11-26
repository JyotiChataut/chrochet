import { Router } from "express";
import Feedback from "../models/Feedback.js";

const router = Router();

router.post("/", async (req, res) => {
  const { message, fileName } = req.body;

  if (!message || message.trim() === "") {
    return res.status(400).json({ msg: "Message is required" });
  }

  try {
    const feedback = await Feedback.create({
      message,
      fileName: fileName || null,
    });

    res.status(201).json({ msg: "Feedback submitted successfully", feedback });
  } catch (err) {
    console.error("Error submitting feedback:", err);
    res.status(500).json({ msg: "Server error" });
  }
});

export default router;
