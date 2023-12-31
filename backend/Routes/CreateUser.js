const express  = require('express')
const mongoose = require('mongoose');
const mongoURI ="mongodb+srv://gprakhar141:gofood@cluster0.diz5xjt.mongodb.net/gofoodmern?retryWrites=true&w=majority";
const router = express.Router()
const User = require("../models/User")
const { body, validationResult } = require('express-validator');

router.post("/createuser", [ 
body('email').isEmail(),
body('name').isLength({ min: 5 }),
body('password','Incorrect Password').isLength({ min: 5 })]
,async(req,res) => {

    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        await mongoose.connect(mongoURI);
        await User.create({
            name:req.body.name,
            password:req.body.password,
            email:req.body.email,
            location:req.body.location
        })
        res.json({successs:true});
    } catch (error) {
        console.log(error);
        res.json({success:false});
    }
})

router.post("/loginuser",[ 
body('email').isEmail(),
body('password','Incorrect Password').isLength({ min: 5 })]
,async(req,res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    let email = req.body.email
        try {
            await mongoose.connect(mongoURI);
            let userData = await User.findOne({email});
            if(!userData) {
                return res.status(400).json({ errors: "Try logging with correct email" })
            }

            if(req.body.password !== userData.password) {
                return res.status(400).json({ errors: "Try logging with correct password" })
            }

            return res.json({ success: true })

        } catch (error) {
            console.log(error);
            res.json({success:false});
        }
    })

module.exports = router;