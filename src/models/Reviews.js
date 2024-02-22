const { Schema, model } = require("mongoose");

const reviewSchema = new Schema({
    uniqueId: {
        type: String,
        required: true
    },
    user_email : {
        type: String,
        required: true
    },
    user_name : {
        type: String, 
        required: true
    },
    user_profile : {
        type: String,
        required: true
    },
    rating : {
        type: Number,
        required: true
    },
    review : {
        type: String,
        required: true
    },
    
});

const Reviews = model('Reviews', reviewSchema);
module.exports = Reviews;

