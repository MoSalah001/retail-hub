const jwt = require("jsonwebtoken");
const router = require("express").Router();
const Line = require('../models/line');

router.post('/', (req,res)=>{
    const parser = req.headers.cookie.split("=")[1]
    let token = parser.split(';')[0]
    try {
        const staffID = req.headers.cookie.split('=')[2]
        const data = req.body
        jwt.verify(token , process.env.JWTSecret)
        const line =  new Line({
            LineType: data.lineType,
            LineTier: data.lineTier,
            LineVC: data.lVC,
            LineMI: data.lMi,
            Date: data.sellDate,
            StaffID: staffID,
            Origin: data.Origin
        })
        line.save();
        res.status(200).send({message:"Line Added"})
    }
    catch(err) {
        // res.cookie('token','',{
        //     httpOnly:true
        // })
        // res.cookie('user','')
        res.status(401).send({message:'unauthorised'})
    }
})

router.post('/all', async (req,res)=>{
    const cookies = req.headers.cookie.split('=')
    const data = {
        staffID: cookies[2]
    }
    const arr = await Line.find({StaffID: data.staffID})
    res.send(arr)
})

module.exports = router