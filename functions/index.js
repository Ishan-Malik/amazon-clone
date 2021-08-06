const functions = require("firebase-functions");
const express=require("express");
const cors=require("cors");
const app=express();
const stripe = require("stripe")('sk_test_51IbrJHSBUPSnTyIi4luliSVUYzvME1nitYn9sc3ORrvjxIW9j4BfEmPScTJwWzm8YjEVJnvNMHsaYHpTzeyWz35B00AA6ctYd6')
app.use(cors({origin: true}));
app.use(express.json());
app.get('/', (req, res)=>{
  res.send("hello world");
});
app.post('/payments/create',async(req,res)=>{
  const {total}=req.body
  const paymentIntent=await stripe.paymentIntents.create({
    amount: total,
    currency: "inr",
  });
  res.status(201).send({
    clientSecret: paymentIntent.client_secret,
  });
});
exports.api=functions.https.onRequest(app);
// http://localhost:5001/clone-6da7e/us-central1/api
