const express = require("express");
const Services = require("../../../models/Services");

const deleteService = async(req,res)=>{
    const {id} = req.params;
    const result = await Services.findByIdAndDelete(id).exec();
    res.send(result);
}

module.exports = deleteService;