const express = require("express");
const multer = require("multer");
const Services = require("../../../models/Services");
const addService = require("../../../api/v1/services/addService");
const htmlToPdf = require("../../../api/v1/services/htmlToPdf");
const { postReview, getReview } = require("../../../api/v1/services/reviews");
const {
  postAdminContact,
  getAdminContact,
  deleteAdminContact,
} = require("../../../api/v1/services/adminContact");
const deleteService = require("../../../api/v1/services/deleteService");
const router = express.Router();

router.get("/all-services", async (req, res) => {
  const result = await Services.find();
  res.send(result);
});

router.post("/convertToPDF", htmlToPdf);
router.post("/upload-service", addService);
router.post("/user-reviews", postReview);
router.get("/user-reviews/:uniqueId", getReview);
router.post("/contact", postAdminContact);
router.get("/contact", getAdminContact);
router.delete("/contact/:id", deleteAdminContact);
router.delete("/delete-service/:id", deleteService);

module.exports = router;
