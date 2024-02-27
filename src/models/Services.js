const { Schema, model } = require("mongoose");

const serviceSchema = new Schema({
    service_name: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    user_email : {
        type: String,
        required: true
    },
    no_of_files:{
        type: Number,
        required: true
    },
    status: {
        type: Boolean
    },
    file : {
        type : String
    }
});

const Services = model('Services', serviceSchema);
module.exports = Services