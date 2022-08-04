const router=require("express").Router()
const verify =require("../middlewares/Verify")
const {Createorder,upadteOrder,deleteOrder,getallorders,getuserorders}=require("../controller/Oredrcontroller")
router.post("/placeorder",verify,Createorder)
router.put("/order/:id",verify,upadteOrder)
router.delete("/order/:id",verify,deleteOrder)
router.get("/order/:id",verify,getuserorders)
router.get("/orders",verify,getallorders)
module.exports=router