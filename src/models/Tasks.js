const { Schema, model } = require("mongoose");

const taskSchema = new Schema({
    uid: {
        type: String,
        required: true
    },
    user_email : {
        type: String,
        required: true
    },
    date : {
        type: Date, 
        required: true
    },
    service_name : {
        type: String,
        required: true
    },
    no_of_files : {
        type: Number,
        required: true
    }
    
});

const Tasks = model('Tasks', taskSchema);
module.exports = Tasks;