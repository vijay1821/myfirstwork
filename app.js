const express= require('express'); 
const jwt= require('jsonwebtoken');
const authorize= require('./authorization-middleware');
const config= require('./config');

const app= express();
const port = process.env.PORT || 5000;


app.get('/token',(req,res)=>{
    const payload={
        name:"vijay kumar",
        scopes:["customer create","customer:read"]
    };

    const token=jwt.sign(payload, config.JWT_SECRET);
    res.send(token);
})
app.get('/customer',authorize("customer:read"),(req,res)=>{
    res.send('<h1>customer information</h1>')
})

const server = app.listen(port,()=>{
    console.log('server is running on'+ (port) )
});