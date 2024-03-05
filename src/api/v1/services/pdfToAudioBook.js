
const pdfParse = require("pdf-parse");

const extractText= (req, res) => {
    if (!req.files && !req.files.pdfFile) {
        res.status(400);
        res.end();
    }
  
    pdfParse(req.files.pdfFile).then(result => {
        res.send(result.text);
    });
  }

  module.exports = extractText;