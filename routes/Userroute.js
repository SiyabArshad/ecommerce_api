const router=require("express").Router()
const verify =require("../middlewares/Verify")
const {Signup,Login,Verification,Forgotpassword,Resetpassword,updateuser,deleteuser,getalluser}=require("../controller/Authcontroller")
router.post("/signup",Signup);
router.post("/login",Login);
router.post("/verify",verify,Verification);
router.post("/forgotpassword",Forgotpassword);
router.put("/resetpassword",verify,Resetpassword);
router.put("/updateuser/:id",verify,updateuser);
router.put("/deleteuser/:id",verify,deleteuser);
router.get("/users",verify,getalluser)
module.exports=router