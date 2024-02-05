
const express = require("express");
const User = require("../../../../models/User");
const app = express();

app.use(express.json());


const createUser = async (req, res) => {
  console.log(req.body?.user_Email)
    const result = await User.find({user_Email: req.body?.user_Email});
    console.log('---',result)
    if(result && result.length > 0){
        return res.send({ message: "user already exists", insertedId: null });
    }

    // console.log('dkjbgfhjgfhj----',req.body);
    const newUser = new User(req.body)
    await newUser.save()
  }



module.exports = createUser