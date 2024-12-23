import express from "express";
const app=express();
const port =process.env.PORT || 5000;
// server works on port 5000
app.listen(port,()=>{
    console.log(`Application work in port ${port}`)
})