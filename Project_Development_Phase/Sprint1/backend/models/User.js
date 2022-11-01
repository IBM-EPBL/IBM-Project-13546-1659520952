const mongoose = require('mongoose');


const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
  
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    college : {
        type : String,
        required : true,
    },
    department : {
        type : String,
        required : true
    },
    domain : {
        type : String,
        required : true
    },
    password: {
        type: String,
        required: true,
    }
});




module.exports = mongoose.model('Users',userSchema)
