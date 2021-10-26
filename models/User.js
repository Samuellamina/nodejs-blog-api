const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    fullname: { type: String, require: true, unique: true },
    email: { type: String, require: true, unique: true },
    password: { type: String, require: true, min: 8 },
    profilePicture: { type: String, default: "" },
    about: { type: String, max: 50 },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
