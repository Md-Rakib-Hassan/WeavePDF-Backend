const express = require("express");
const Services = require("../../../models/Services");

const app = express()

app.use(express.json())

const addService = async(req,res)=>{
    console.log("added service");
    const service = new Services(req.body);
    await service.save();
}
