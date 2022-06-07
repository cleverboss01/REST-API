const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name field is required!"],
    },
    age: Number,
    email: {
      type: String,
      unique: true,
      required: [true, "Email field cannot be blank"],
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("User", userSchema);
