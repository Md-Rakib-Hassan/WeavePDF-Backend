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

router.post('/create-user', async(req,res)=>{
    const customer = await stripe.customers.create({
        name: req.query?.name,
        email: req.query?.email
    })
    res.send(customer)
})

router.post('/start-monthly-subscription', async(req,res)=>{
    const plan = await stripe.plans.create({
        amount: 50000, 
        currency: 'usd',
        interval: 'month',
        product: {
          name: 'Monthly Subscription',
          type: 'service', // 'service' or 'good'
        },
      });
    res.send(plan)
})
router.post('/start-yearly-subscription', async(req,res)=>{
    const plan = await stripe.plans.create({
        amount: 540000, 
        currency: 'usd',
        interval: 'year',
        product: {
          name: 'Yearly Subscription',
          type: 'service', // 'service' or 'good'
        },
      });
    res.send(plan)
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