const express = require("express")
const login = require("./Routes/login")
const mongo = require('mongoose')
const env = require('dotenv')

env.config();
mongo.connect(process.env.DBHost,{
    "auth": {"authsource": "admin"},
    "user": process.env.DBUser,
    "pass": process.env.DBPass
}).then(()=>{
    console.log("Connected...");
}).catch(err =>{
    console.log(err);
})

const app = express();
const port = 3000;
app.use(express.json());
app.use(express.static('Client'));
app.use('/user',login);




app.listen(port,()=>{
    console.log('http://127.0.0.1:3000');
})


