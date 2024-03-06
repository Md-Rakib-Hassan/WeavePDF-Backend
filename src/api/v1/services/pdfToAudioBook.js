
const pdfParse = require("pdf-parse");

const extractText= (req, res) => {
    if (!req.files && !req.files.pdfFile) {
        res.status(400);
        res.end();
    }
    
  
        pdfParse(req.files.pdfFile).then(result => {
            if(!/[A-Za-z]/.test(result.text)){
                res.send('We cant convert this pdf file, please try again with a different pdf file.');
            }
            else{
                res.send(result.text);
                
            }
            
            
        });
    
   
    
  }

  module.exports = extractText;