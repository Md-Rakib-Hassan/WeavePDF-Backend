const express = require("express");
const Services = require("../../../models/Services");
const app = express()

app.use(express.json())


const addService = async(req,res)=>{
    const {date, user_email, no_of_files, service_name, status} = req.body;
    const service = new Services({
    date, user_email, no_of_files, service_name, status
  })

  try{
    const newService = await service.save()
  }catch(err){
    console.log(err);
  }
}



module.exports = addService;
