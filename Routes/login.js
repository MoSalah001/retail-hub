const router = require("express").Router();

router.post('/login',(req,res)=>{
    const user = {
        ID : req.body.staffID,
        Pass: req.body.pass
    }
    res.send(user)
})

router.get('/',(req,res)=>{
    res.send("hello")
})

module.exports = router