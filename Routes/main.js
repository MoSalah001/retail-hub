const jwt = require("jsonwebtoken");
const router = require("express").Router();
const Line = require('../models/line');
const DSL = require('../models/dsl')

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
        res.status(401).send({message:'unauthorised'})
    }
})

router.post('/all', async (req,res)=>{
    const cookies = req.headers.cookie.split('=')
    const data = {
        staffID: cookies[2]
    }
    const arr = await Line.find({StaffID: data.staffID}).sort({"Date":-1})
    console.log(arr);
    res.send(arr)
})

router.post('/dsl', (req,res)=>{
    const cookies = req.headers.cookie.split('=')
    const data = {
        staffID: cookies[2],
        token: cookies[1].split(';')[0]
    }
    try {
        jwt.verify(data.token,process.env.JWTSecret)
        const dsl = new DSL({
            MSISDN : parseInt(req.body.mobile),
            Status: "Pending",
            LL : parseInt(req.body.landline),
            date: req.body.date,
            StaffID : parseInt(data.staffID)
        })
        dsl.save()
        res.status(200).send({message:"DSL Added"})
    }
    catch(err){
        res.send({message:err})
    }
})

module.exports = router