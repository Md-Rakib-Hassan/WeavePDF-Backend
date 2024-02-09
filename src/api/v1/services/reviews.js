const Reviews=require('../../../models/Reviews');
const postReview=async (req, res) =>{
  const newReview= new Reviews(req.body);
  await newReview.save();

}

const getReview = async(req, res) => {

    const results=await Reviews.find({uniqueId: req.params.uniqueId})
    res.send(results);
  
  }

module.exports = {postReview, getReview};