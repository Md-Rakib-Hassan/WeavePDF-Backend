const express = require("express");
const User = require("../../../../models/User");
const app = express();

app.use(express.json());

const createUser = async (req, res) => {
  try {
    const { user_Email } = req.body;
    const existingUser = await User.findOne({ user_Email });
    if (existingUser) {
      return res
        .status(400)
        .json({ message: "User already exists", insertedId: null });
    }

    const newUser = new User(req.body);
    await newUser.save();
    res
      .status(201)
      .json({ message: "User created successfully", insertedId: newUser._id });
  } catch (error) {
    console.error("Error creating user:", error);
    res
      .status(500)
      .json({ message: "Internal server error", insertedId: null });
  }
};

module.exports = createUser;
