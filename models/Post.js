const mongoose = require("mongoose");

const postSchema = new mongoose.Schema(
  {
    userId: { type: String, required: true },
    title: { type: String, require: true },
    content: { type: String },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Post", postSchema);
