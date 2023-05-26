const jwt = require("jsonwebtoken");
const router = require("express").Router();

router.post('/',(req,res)=>{
    const parser = req.headers.cookie.split("=")[1]
    let token = parser.split(';')[0]
    try {
        jwt.verify(token , process.env.JWTSecret)
        res.status(200).send()
    }
    catch(err) {
        res.cookie('token','',{
            httpOnly:true
        })
        res.cookie('user','')
        res.status(401).send({message:'window.origin'})
    }
})

module.exports = router