const { Schema, model } = require("mongoose");

const userSchema = new Schema({
  user_Name: {
    type: String,
    required: true,
  },
  user_Email: {
    type: String,
    required: true,
    unique: true,
  },
  user_Profile_Picture: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    default: "user",
  },
});

const User = model("User", userSchema);

module.exports = User;
