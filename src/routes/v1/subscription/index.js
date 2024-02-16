const express = require("express");
const User = require("../../../models/User");
const stripe = require("stripe")(process.env.STRIPE_SECRET)
const router = express.Router();


router.post('/create-payment-intent', async (req,res)=>{
    const { price } = req.body;
    const amount = parseInt(price * 100);
    const paymentIntent = await stripe.paymentIntents.create({
        amount: amount,
        currency : "usd",
        payment_method_types : ["card"]
    })
    res.send({
        clientSecret: paymentIntent.client_secret
    })
})

router.patch('/make-premium', async(req,res)=>{
    const email = req.query?.email;
    const filter = {user_Email : email};
    const doc = req.body;
    const option= {upsert: true};
    const updatedDoc = {
        $set: {
            isPremium : doc.isPremium,
            subscription_type : doc.subscription_type
        }
    }
    const result = await User.findOneAndUpdate(filter,updatedDoc).exec();
    res.send(result);
})

module.exports = router