const express = require("express");
const router = express.Router();
const Order = require("../models/Orders");
const mongoose = require('mongoose');
const mongoURI ="mongodb+srv://gprakhar141:gofood@cluster0.diz5xjt.mongodb.net/gofoodmern?retryWrites=true&w=majority";

router.post("/orderData", async (req, res) => {
  let data = req.body.order_data;
  await data.splice(0, 0, { Order_date: req.body.order_date });

  //if email not existing in db then create; else:InsertMany()
  await mongoose.connect(mongoURI);
  let eId = await Order.findOne({ email: req.body.email });
  console.log(eId);
  if (eId === null) {
    try {
      await Order.create({
        email: req.body.email,
        order_data: [data],
      }).then(() => {
        res.json({ success: true });
      });
    } catch (error) {
      console.log(error.message);
      res.send(error.message);
    }
  } else {
    try {
        await Order.findOneAndUpdate({email: req.body.email},
            { $push: {order_data: data} }).then(() => {
                res.json({success: true})
            })
    }catch(error) {
        res.send("Server Error",error.message)
    }
  }
});

router.post("/myorderData", async (req, res) => {
  try{
    await mongoose.connect(mongoURI);
    let myData = await Order.findOne({'email':req.body.email})
    res.json({ orderData:myData })
  }catch(error) {
    res.send(error.message)
  }
})

module.exports = router;