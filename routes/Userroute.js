const router=require("express").Router()
const {Signup,Login,Verification}=require("../controller/Authcontroller")
router.post("/signup",Signup);
module.exports=router