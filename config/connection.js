const mongoose=require("mongoose")
const connection=()=>{
    mongoose.connect("mongodb+srv://eshop:gfxm12345@cluster0.iyh0r.mongodb.net/?retryWrites=true&w=majority",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true
  }
).then(()=>console.log('db connected')).catch(err=>console.log(err));
}
module.exports=connection
