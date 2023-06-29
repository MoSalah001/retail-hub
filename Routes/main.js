const jwt = require("jsonwebtoken");
const router = require("express").Router();
const Line = require('../models/line');
const line = require("../models/line");

router.post('/', (req,res)=>{
    console.log(req.headers.cookie);
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
            StaffID: staffID
        })
        line.save();
        res.status(200).send()
    }
    catch(err) {
        // res.cookie('token','',{
        //     httpOnly:true
        // })
        // res.cookie('user','')
        res.status(401).send({message:'unauthorised'})
    }
})

module.exports = router