import { Router } from "express";
import Feedback from "../models/Feedback.js";

const router = Router();

router.post("/", async (req, res) => {
  const { message, fileName } = req.body;

  if (typeof message !== "string" || message.trim() === "") {
    return res.status(400).json({ msg: "Message is required" });
  }

  if (message.trim().length > 5000) {
    return res
      .status(400)
      .json({ msg: "Message must be 5000 characters or fewer" });
  }

  if (
    fileName !== undefined &&
    fileName !== null &&
    (typeof fileName !== "string" || fileName.length > 255)
  ) {
    return res.status(400).json({ msg: "File name is invalid" });
  }

  try {
    const feedback = await Feedback.create({
      message: message.trim(),
      fileName: fileName && fileName.trim() ? fileName.trim() : null,
    });

    res.status(201).json({ msg: "Feedback submitted successfully", feedback });
  } catch (err) {
    console.error("Error submitting feedback:", err);
    res.status(500).json({ msg: "Server error" });
  }
});

export default router;
