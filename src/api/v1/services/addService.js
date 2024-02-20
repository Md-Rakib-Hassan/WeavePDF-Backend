const express = require("express");
const Services = require("../../../models/Services");
const fs = require('fs');
const { log } = require("console");

const app = express()

app.use(express.json())

const fileMimeType = ['application/pdf', 'application/msword']

const addService = async(req,res)=>{
    const {date, user_email, no_of_files, service_name, status, pdf} = req.body;
    // console.log(file);
    // console.log(req.body);
    // const pdfFile = fs.readFileSync(file)
    const file = new Buffer.from(pdf).toString('base64');
    const service = new Services({
    date, user_email, no_of_files, service_name, status, file
  })
//   savepdf(service,file)

  try{
    const newService = await service.save()
  }catch(err){
    console.log(err);
  }
//   console.log("service to be added: ",service);
}

//save pdf as binary

const savepdf = (service, pdfencoded) =>{
    if(!pdfencoded) return;
    const pdf = JSON.parse(JSON.stringify(pdfencoded));
    // console.log("parsed: ", pdfencoded);
    if(pdf && fileMimeType.includes(pdf.type)){
        service.pdf = new Buffer.from(pdf.data, 'base64')
    }
}

module.exports = addService;
