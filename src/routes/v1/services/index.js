const express = require("express");
const multer = require("multer");
const Services = require("../../../models/Services");
const addService = require("../../../api/v1/services/addService");
const htmlToPdf = require("../../../api/v1/services/htmlToPdf");
const {postReview,getReview} = require("../../../api/v1/services/reviews");
const { route } = require("../authentication");
const { postTask, getTask } = require("../../../api/v1/services/tasks");
const {
  postAdminContact,
  getAdminContact,
  deleteAdminContact,
} = require("../../../api/v1/services/adminContact");
const deleteService = require("../../../api/v1/services/deleteService")
const fileUpload = require("express-fileupload");
const extractText = require("../../../api/v1/services/pdfToAudioBook");
const router = express.Router();
router.use(fileUpload());

router.get("/all-services", async (req, res) => {
  const result = await Services.find();
  res.send(result);
});


router.post("/extract-text", extractText);
router.get('/tasks/:email',getTask)
router.post('/tasks',postTask)
router.post("/convertToPDF", htmlToPdf);
router.post("/upload-service", addService);
router.post("/user-reviews", postReview);
router.get("/user-reviews/:uniqueId", getReview);
router.post("/contact", postAdminContact);
router.get("/contact", getAdminContact);
router.delete("/contact/:id", deleteAdminContact);
router.delete("/delete-service/:id", deleteService)


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

