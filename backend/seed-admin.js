import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";
import User from "./models/User.js";

dotenv.config();

const email = process.env.ADMIN_EMAIL;
const password = process.env.ADMIN_PASSWORD;

if (!email || !password) {
  console.error("ADMIN_EMAIL and ADMIN_PASSWORD are required");
  process.exit(1);
}

try {
  await mongoose.connect(process.env.MONGO_URI);

  const existing = await User.findOne({ email });
  if (existing) {
    console.log("Admin already exists");
  } else {
    const hashed = await bcrypt.hash(password, 10);
    await User.create({ email, password: hashed, isAdmin: true });
    console.log("Admin created");
  }
} catch (err) {
  console.error("Seeding failed:", err);
  process.exitCode = 1;
} finally {
  await mongoose.disconnect();
}
