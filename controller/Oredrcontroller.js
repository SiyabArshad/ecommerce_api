const Order=require("../models/Order")
//order placed
const Createorder=async()=>{
    try{
        const newOrder = new Order(req.body);
        if(!req.user.isdisabled)
        {
            const savedOrder = await newOrder.save();
            return res.status(200).json({
                msg:"Order placed Sucessfully",
                order:savedOrder
            })
        }
        else
        {
            return res.status(401).json({
                msg:"bad request"
            })
        }
    }
    catch
    {
        return res.status(500).json({
            msg:"server error"
        })
    }
}
//update
const upadteOrder=async(req,res)=>{
    try{
        if(!req.user.isdisabled&&req.user.role===2||req.user.role===1)
        {
            const updatedorder = await Order.findByIdAndUpdate(
                req.params.id,
                {
                  $set: req.body,
                },
                { new: true }
              );
            return res.status(200).json({
                msg:"Order Updated Sucessfully",
                order:updatedorder
            })
        }
        else
        {
            return res.status(401).json({
                msg:"bad request"
            })
        }
    }
    catch
    {
        return res.status(500).json({
            msg:"server error"
        })
    }
}
//delete
const deleteOrder=async(req,res)=>{
    try{
        if(!req.user.isdisabled&&req.user.role===2||req.user.role===1)
        {
            await Order.findByIdAndDelete(req.params.id);
            return res.status(200).json({
                msg:"Order deleted Sucessfully Refunding"
            })
        }
        else
        {
            return res.status(401).json({
                msg:"bad request"
            })
        }
    }
    catch
    {
        return res.status(500).json({
            msg:"server error"
        })
    }
}
//get all order
const getallorders=async(req,res)=>{
    try{
        if(!req.user.isdisabled&&req.user.role===2||req.user.role===1)
        {
            const orders = await Order.find().sort();
            return res.status(200).json({
                msg:"Orders Fetched",
                orders:orders
            })
        }
        else
        {
            return res.status(401).json({
                msg:"bad request"
            })
        }
    }
    catch
    {
        return res.status(500).json({
            msg:"server error"
        })
    }
}
//get user orders
const getuserorders=async(req,res)=>{
    try{
        if(!req.user.isdisabled&&req.user.id===req.params.id)
        {
            const orders = await Order.find({ userId: req.params.id }).sort();
            return res.status(200).json({
                msg:"Orders Fetched",
                orders:orders
            })
        }
        else
        {
            return res.status(401).json({
                msg:"bad request"
            })
        }
    }
    catch
    {
        return res.status(500).json({
            msg:"server error"
        })
    }
}
module.exports={Createorder,upadteOrder,deleteOrder,getallorders,getuserorders}