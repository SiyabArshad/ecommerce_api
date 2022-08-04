const Product=require("../models/Product")
const addproduct=async(req,res)=>{
    try{
        if(req.user.isdisabled&&req.user.role===2||req.user.role===1)
        {
           const newproduct=new Product({
            title:req.body.title,
            desc:req.body.desc,
            quan:req.body.quan,
            price:req.body.price,
            cat:req.body.cat,
            imgs:req.body.imgs
           })
           const newone=await newproduct.save()
           return  res.json(200).json({
            msg:"Product added",
            product:newone
        })
        }
        else
        {
            return  res.json(401).json({
                msg:"You are not allow to perform this operation"
            })
        }
    }
    catch{
        return  res.json(500).json({
            msg:"server error"
        })
    }
}
const updateproduct=async(req,res)=>{
    try{
        if(req.user.isdisabled&&req.user.role===2||req.user.role===1)
        {
           const updatedproduct= await Product.findByIdAndUpdate(req.params.id,{
            $set:req.body
           },
           {
            new:true
           }           
           )
           return  res.json(200).json({
            msg:"Product updated",
            product:updatedproduct
        })
        }
        else
        {
            return  res.json(401).json({
                msg:"You are not allow to perform this operation"
            })
        }
    }
    catch{
        return  res.json(500).json({
            msg:"server error"
        })
    }
}

const deleteproduct=async(req,res)=>{
    try{
        if(req.user.isdisabled&&req.user.role===2)
        {
           const deletedproduct= await Product.findByIdAndDelete(req.params.id)
           return  res.json(200).json({
            msg:"Product deleted"
        })
        }
        else
        {
            return  res.json(401).json({
                msg:"You are not allow to perform this operation"
            })
        }
    }
    catch{
        return  res.json(500).json({
            msg:"server error"
        })
    }
}

const getallproduct=async(req,res)=>{
    try{
        const products=await Product.find();
        if(products)
        {
            return  res.json(200).json({
                msg:"all Products fetched",
                products:products
            })    
        }
        else
        {
            return  res.json(401).json({
                msg:"Fetching Failed"
            })
        }
    }
    catch{
        return  res.json(500).json({
            msg:"server error"
        })
    }
}
const singleproduct=async(req,res)=>{
    try{
        const product=await Product.findById(req.params.id);
        if(product)
        {
            return  res.json(200).json({
                msg:"Product fetched",
                product:product
            })    
        }
        else
        {
            return  res.json(401).json({
                msg:"Product not exist"
            })
        }
    }
    catch{
        return  res.json(500).json({
            msg:"server error"
        })
    }
}
module.exports={addproduct,getallproduct,singleproduct,deleteproduct,updateproduct}