import mongoose, { Schema } from "mongoose";

interface UserInterface {
  walletAddress: string;
  profilePhoto?: string;
  coverPhoto?: string;
}

const userSchema: Schema<UserInterface> = new mongoose.Schema({
  walletAddress: {
    type: String,
    required: true,
    unique: true
  },
  profilePhoto: {
    type: String
  },
  coverPhoto: {
    type: String
  },
});

const User = mongoose.model("User", userSchema);

module.exports = User;
