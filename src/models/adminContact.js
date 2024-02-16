const { Schema, model } = require("mongoose");

const adminContactSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email : {
        type: String,
        required: true
    },
    massage: {
        type: String,
        required: true
    }
});

const adminContact = model('adminContact', adminContactSchema);
module.exports = adminContact
