
const express = require("express");
const User = require("../../../../models/User");
const app = express();

app.use(express.json());


const createUser = async (req, res) => {
    const newUser = new User(req.body)
    await newUser.save()
  }

module.exports = createUser