const express = require("express")
const multer = require("multer")
const Services = require("../../../models/Services");
const addService = require("../../../api/v1/services/addService");
const htmlToPdf = require("../../../api/v1/services/htmlToPdf");

const router = express.Router()

router.get("/upload-file", async(req, res)=>{
    const result = await Services.find();
    res.send(result)
})

router.post('/convertToPDF', htmlToPdf);

router.post("/user-services", addService)

// -------multer--------

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './files')
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now()
      cb(null, uniqueSuffix+file.originalname)
    }
  })
  
  const upload = multer({ storage: storage })
  router.post('/upload-file', upload.single('mergedFile'), async(req,res)=>{
      const fileName = req.file.filename;
      try{
        Services.create({
            no_of_files: req.body.no_of_files,
            date: req.body.date,
            service_name: req.body.service_name,
            user_email: req.body.user_email,
            status: req.body.status,
            mergedFile: fileName
        });
        res.send({status : 'ok'})
      }catch(err){
        res.json({status: err})
      }
  })

module.exports = router