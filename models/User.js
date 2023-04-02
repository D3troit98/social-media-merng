import mongoose from "mongoose";

const userSchema = mongoose.Schema({
  username: String,
  password: String,
  email: String,
  createdAt: String,
  id: String,
});

export default mongoose.model("User", userSchema);
