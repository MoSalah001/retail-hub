const router = require("express").Router();
const User = require("../models/user");
const jwt = require("jsonwebtoken")
const bcrypt = require('bcrypt')

router.post('/reg', async (req,res)=>{
    const hashedPass = await bcrypt.hash(req.body.pass,10,(err,hash)=>{
        if (err) throw err
        return hash
    })
    const user = new User({
        StaffID: parseInt(req.body.staffID),
        Pass : hashedPass
    })
})


router.post('/login', async (req,res)=>{
    // const user = new User({
    //     StaffID : parseInt(req.body.staffID),
    //     Pass : req.body.pass
    // })

    try {

        // const savedUser = await user.save();
        // res.json(savedUser)


        const user = await User.find({
            StaffID : parseInt(req.body.staffID),
            Pass : req.body.pass.toString()
        })
        const token = jwt.sign(user[0]._id,process.env.JWT-Secret)
        res.json({
            staffID:user[0].StaffID,
            userID: user[0]._id
        })
    } catch (err){
        res.json({message: "Wrong staff ID or password"})
    }
})

router.get('/',(req,res)=>{
    res.send("hello")
})

module.exports = router