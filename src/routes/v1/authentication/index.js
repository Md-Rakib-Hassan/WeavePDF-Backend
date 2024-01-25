const express = require('express');
const { createUser } = require('../../../api/v1/authentication/controllers');
const User = require('../../../models/User');
const router = express.Router()


router.get("/users", async (req, res) => {
    // console.log(req.headers);
    const result = await User.find();
    console.log(result);
    res.send(result);
  });

router.post("/users", createUser);

module.exports = router;