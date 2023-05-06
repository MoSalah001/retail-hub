const express = require("express")
const login = require("./Routes/login")

const app = express();

const port = 3000;
app.use(express.json());
app.use(express.static('Client'));
app.use('/user',login);

app.listen(port,()=>{
    console.log('http://127.0.0.1:3000');
})
