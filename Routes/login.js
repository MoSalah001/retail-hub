const router = require("express").Router();
const User = require("../models/user")

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
        res.json(user[0].StaffID)
    } catch (err){
        res.json({message: "Wrong staff ID or password"})
    }
})

router.get('/',(req,res)=>{
    res.send("hello")
})

module.exports = router