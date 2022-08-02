const mongoose=require("mongoose")
const userSchema=new mongoose.Schema({
    username:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    profile:{
        type:String,
        default:""
    },
    role:{
        type:Number,
        default:0//0 for users 1 for employees and 2 for admins
    },
    isdisabled:{
        type:Boolean,
        default:false
    }

},{timestamps:true})
module.exports=mongoose.model("usres",userSchema)