const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema  = new Schema({
        fullName:{
            type: String,
            required:true
        },
        email:{
            type:String,
            required:true,
            unique:true
        },
        password:{
            type:String,
            required:true
        },
        createdAt:{
            type: Date,
            default:Date.now()
        },
        updatedAt:{
        type:Date,
        default:null
    },
    otpvalidated:{
        type:Boolean,
        default:false,
    }
});

const  userModel = mongoose.model('UsersCollection', userSchema)
module.exports = userModel;