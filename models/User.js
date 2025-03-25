// /models/User.js
import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String }, // will be present for form signup users
  provider: { type: String, default: "credentials" }, // e.g., "google", "github", "credentials"
  // Fields to be updated later via role updation:
  role: { type: String, enum: ["candidate", "hr"], default: null },
  companyName: { type: String }, // Only for HR
  bio: { type: String }
});

const User = mongoose.models.User || mongoose.model("User", userSchema);
export default User;
