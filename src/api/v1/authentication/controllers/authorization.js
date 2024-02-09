const express = require("express");
const User = require("../../../../models/User");
const app = express();

app.use(express.json());

const adminIndentify = async (req, res) => {
    const requestedEmail = req.params?.email;
    // console.log(req.params)
  
    // if (requestedEmail !== req.decoded.email) {
    //   return res.status(403).send({ message: "Forbidden access" });
    // }
  
    try {
      const user = await User.findOne({ user_Email: requestedEmail });
      let isAdmin = false;
  
      if (user) {
        isAdmin = user.role === "admin";
      }
  
      res.send({ admin: isAdmin });
    } catch (error) {
      console.error(error);
      res.status(500).send({ error: "Internal Server Error" });
    }
  }

  module.exports = adminIndentify