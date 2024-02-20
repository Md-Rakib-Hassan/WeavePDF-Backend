const express = require("express");
const Services = require("../../../models/Services");

const deleteService = async(req,res)=>{
    const id = req.params;
    const query = { _id: new ObjectId(id) };
    const result = await Services.findOneAndDelete(query).exec();
    res.send(result);
}

module.exports = deleteService;