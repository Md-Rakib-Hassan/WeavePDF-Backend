const express = require("express");
const Services = require("../../../models/Services");


const app = express()

app.use(express.json())

const addService = async(req,res)=>{
    const {date, user_email, no_of_files, service_name, status, file} = req.body;
    // console.log(req.body);
  const service = new Services({
    date, user_email, no_of_files, service_name, status
  })
  console.log("service to be added: ",service);
}

module.exports = addService;
