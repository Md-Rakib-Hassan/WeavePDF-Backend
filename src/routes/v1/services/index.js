const express = require("express")
const Services = require("../../../models/Services");
const addService = require("../../../api/v1/services/addService");
const htmlToPdf = require("../../../api/v1/services/htmlToPdf");
const {postReview,getReview} = require("../../../api/v1/services/reviews");
const router = express.Router()

router.get("/user-services", async(req, res)=>{
    const result = await Services.find();
    res.send(result)
})

router.post('/convertToPDF', htmlToPdf);
router.post("/user-services", addService)
router.post('/user-reviews', postReview);
router.get('/user-reviews/:uniqueId',getReview);


module.exports = router