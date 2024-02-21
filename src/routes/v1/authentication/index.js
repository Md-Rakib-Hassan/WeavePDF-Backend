const express = require('express');
const { createUser ,adminIndentify} = require('../../../api/v1/authentication/controllers');
const User = require('../../../models/User');
const router = express.Router()
const app = express();

app.use(express.json());


router.get("/users", async (req, res) => {
    // console.log(req.headers);
    const uemail = req.query?.email;
    const query = { user_Email: uemail }
    const result = await User.find(query);
    // console.log(result);
    res.send(result);
  });

router.post("/users", createUser);

router.get("/users/admin/:email",adminIndentify);

module.exports = router;