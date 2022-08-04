const mongoose=require("mongoose")
const productSchema=new mongoose.Schema({
    title:{
        type:String,
        required:true,
    },
    desc:{
        type:String,
        required:true,
    },
    quan:{
        type:Number,
        default:5
    },
    price:{
        type:Number,
        default:1
    },
    cat:{
        type:String,
        default:""
    },
    imgs:[{type:String}]

},{timestamps:true})
module.exports=mongoose.model("usres",productSchema)