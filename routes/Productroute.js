const router=require("express").Router()
const verify =require("../middlewares/Verify")
const {addproduct,updateproduct,deleteproduct,getallproduct,singleproduct}=require("../controller/Productcontroller")
router.post("/addproduct",verify,addproduct);
router.put("/updateproduct/:id",verify,updateproduct);
router.delete("/deleteproduct/:id",verify,deleteproduct);
router.get("/",getallproduct)
router.get("/:id",singleproduct)
module.exports=router