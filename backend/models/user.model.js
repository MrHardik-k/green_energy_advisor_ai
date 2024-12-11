import mongoose from "mongoose";

const userCredSchema = new mongoose.Schema(
  {
    uid: { type: String, required: true, unique: true }, // Firebase UID
    name: { type: String },
    email: { type: String, unique: true },
    photoURL: { type: String },
  },
  {
    timestamps: true,
  }
);

const UserCreds = mongoose.model("userCreds", userCredSchema);

export default UserCreds;
