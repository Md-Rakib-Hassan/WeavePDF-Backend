const express = require("express");
const {
  createUser,
  adminIndentify,
} = require("../../../api/v1/authentication/controllers");
const User = require("../../../models/User");
// const storage = multer.memoryStorage();
const { PDFDocument } = require("pdf-lib");

const router = express.Router();
// const officegen = require("officegen");
const fs = require("fs").promises;
// const path = require("path");
const pdfParse = require("pdf-parse");
const app = express();
const multer = require('multer');

app.use(express.json());
// app.use(express.urlencoded({ extended: true }));

// Store files in memory
const upload = multer({ storage: multer.memoryStorage() });
router.post("/delete-pages", upload.single("pdf"), async (req, res) => {
  try {
    const { range } = req.body;
    console.log(range);
    const pdfBuffer = req.file.buffer;

    const pdfDoc = await PDFDocument.load(pdfBuffer);
    const pagesToDelete = parsePageRange(range);
    console.log(pagesToDelete);
    for (const pageNum of pagesToDelete) {
      pdfDoc.removePage(pageNum - 1);
    }

    const modifiedPdfBuffer = await pdfDoc.save();
    res.setHeader("Content-Disposition", "attachment; filename=modified.pdf");
    res.setHeader("Content-Type", "application/pdf");
    res.send(modifiedPdfBuffer);
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

function parsePageRange(range) {
  const pages = [];
  const parts = range.split(",");

  for (const part of parts) {
    if (part.includes("-")) {
      const [start, end] = part.split("-").map(Number);
      for (let i = start; i <= end; i++) {
        pages.push(i);
      }
    } else {
      pages.push(Number(part));
    }
  }

  return pages;
}

router.get("/users", async (req, res) => {
  // console.log(req.headers);
  const uemail = req.query?.email;
  console.log("user----: ", uemail);
  let query = {};
  if (uemail) {
    query = { user_Email: uemail };
  }
  const result = await User.find(query);
  console.log(result);
  res.send(result);
});

router.post("/users", createUser);

router.get("/users/admin/:email", adminIndentify);

module.exports = router;
