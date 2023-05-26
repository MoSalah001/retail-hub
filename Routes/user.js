const router = require("express").Router();
const User = require("../models/user");
const jwt = require("jsonwebtoken")
const bcrypt = require('bcrypt')

router.post('/reg', async (req,res)=>{
    try {
        bcrypt.hash(req.body.pass,10, async (err,hash)=>{
            if (err) res.json({"message":err})
            const user = await new User({
                StaffID : parseInt(req.body.staffID),
                Pass : hash
            })
            const savedUser = await user.save()
            const token = jwt.sign(savedUser._id,process.env.JWTSecret)
        res.cookie('token',token,{
            httpOnly:true,
            expires: new Date.now()+ (4 * 24 * 60 * 60 * 1000) // Convert 4 days to milliseconds
        }).render('main.html')
        })
    } catch (err) {
        res.json({"message": err._message})
    }
})


router.post('/login', async (req,res)=>{

    try {
        const user = await User.find({
            StaffID : parseInt(req.body.staffID)
        })
        bcrypt.compare(req.body.pass,user[0].Pass,(err,result)=>{
            if(err) res.json({"message":"Wrong password"});
            else {
                const maxAge =  Date.now()+ (4 * 24 * 60 * 60 * 1000);// Convert 4 days to milliseconds
                const token = jwt.sign({
                    id:user[0]._id,
                    staffID:user[0].StaffID,
                    admin:user[0].admin ? user[0].admin : false
                },process.env.JWTSecret)
                res.cookie('token',token,{
                    httpOnly:true,
                    expires: new Date(maxAge) // as expires takes a date object
                })
                res.cookie('user',user[0].StaffID,{
                    expires:new Date(maxAge)
                })
                
                res.redirect(301,'/main.html')
            }
        })
    } catch (err){
        res.status(401).json({message: "Wrong staff ID or password"})
    }
})

router.get('/',(req,res)=>{
    res.send("hello")
})

module.exports = router