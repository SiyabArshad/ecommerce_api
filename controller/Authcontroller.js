const User=require("../models/User")
const jwt=require("jsonwebtoken")
const CryptoJs=require("crypto-js")
const nodemailer=require("nodemailer")
const Signup=async(req,res)=>{
    try{
        const alreadyuser=await User.findOne({email:req.body.email})
        if(alreadyuser)
        {
            return res.status(401).json({
                msg:"User Already exist"
            })          
        }
    const password=CryptoJs.AES.encrypt(req.body.password,process.env.seckey).toString()
    const token=jwt.sign({
        username:req.body.username,
        email:req.body.email,
        password:password,
        role:req.body.role,
        profile:req.body.profile 
    },
    process.env.seckey
    ,{expiresIn:"1h"})
    let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: process.env.bemail,
          pass: process.env.bpass,
        },
      });
      transporter.sendMail({
        from: process.env.bemail, // sender address
        to: req.body.email, // list of receivers
        subject: `Hello ✔ ${req.body.email}`, // Subject line
        text: "Here is Your activation Link click on link activation Token will expire in 1 hour", // plain text body
        html: `<a href=http://localhost:3000/eshop/users/verify/${token}>Confirm Your Account</a>`, // html body
      },(err,succ)=>{
        if(err)
        {
          return res.status(500).json({
            msg:err + "Email not sent"
          });
        }
        else
        {
            return res.status(200).json({
            msg: "Confirmation Email sent Sucessfully"
          });
        }
      });
      
    }
    catch(e)
    {
        return res.status(500).json({
            msg:"Server error"
        })
    }
}

const Verification=async(req,res)=>{
    try{
        const user=new User({
            username:req.user.username,
            email:req.user.email,
            password:req.user.password,
            role:req.user.role,
            profile:req.user.profile
        })
        const newuser=await user.save()
        return res.status(200).json({
            msg:"Registration completed"
            ,user:newuser
        })
    }
    catch
    {
        return res.status(500).json({
            msg:"Server error"
        })
    }
}

const Login=async(req,res)=>{
    try{
        const user = await User.findOne({ email: req.body.email });
        if(!user.isdisabled)
        {
            const bytes = CryptoJS.AES.decrypt(user.password, process.env.seckey);
            const originalPassword = bytes.toString(CryptoJS.enc.Utf8);
            if(originalPassword===req.body.password)
            {
                const accessToken = jwt.sign(
                    { id: user._id,role:user.role},
                    process.env.seckey,
                    { expiresIn: "7d" }
                  );
                  const { password, ...info } = user._doc;
                  return res.status(200).json({ ...info, accessToken });
            }
            else
            {
                return res.status(401).json({
                    msg:"wrong password"
                })     
            }
        }
        else
        {
            return res.status(404).json({
                msg:"invalid email address"
            })
        }
    }
    catch(err){
      return  res.json(500).json({
            msg:"server error"
        })
    }
}
//forgot password
const Forgotpassword=async(req,res)=>{
    try{
        const alreadyuser=await User.findOne({email:req.body.email})
        if(!alreadyuser.isdisabled)
        {
            
            const token=jwt.sign({
                docid:alreadyuser._id,
            },
            process.env.seckey
            ,{expiresIn:"1h"})
            let transporter = nodemailer.createTransport({
                service: 'gmail',
                auth: {
                  user: process.env.bemail,
                  pass: process.env.bpass,
                },
              });
              transporter.sendMail({
                from: process.env.bemail, // sender address
                to: req.body.email, // list of receivers
                subject: `Hello ✔ ${req.body.email}`, // Subject line
                text: "Here is Your Password Link click on link For Password Recovery Token will expire in 1 hour", // plain text body
                html: `<a href=http://localhost:3000/eshop/users/reset/${token}>Confirm Your Account</a>`, // html body
              },(err,succ)=>{
                if(err)
                {
                  return res.status(500).json({
                    msg:err + "Email not sent"
                  });
                }
                else
                {
                    return res.status(200).json({
                    msg: "Password Reset Email sent Sucessfully"
                  });
                }
              });
        

        }
        else
        {
            return res.status(404).json({
                msg:"invalid email address"
            })
        }
    }
    catch{
        return  res.json(500).json({
            msg:"server error"
        })
    }
}
//Reset Password
const Resetpassword=async(req,res)=>{
    try{
            req.body.password = CryptoJS.AES.encrypt(
              req.body.password,
              process.env.seckey
            ).toString();
          const updatedUser = await User.findByIdAndUpdate(
            req.user.docid,
            {
              $set: req.body,
            },
            { new: true }
          );
          return  res.json(200).json({
            msg:"Password Updated"
        })   
    }
    catch{
        return  res.json(500).json({
            msg:"server error"
        })
    }
}

//update user
const updateuser=async(req,res)=>{  
    try{
        const alreadyuser=await User.findOne({email:req.body.email})
        if(!alreadyuser.isdisabled&&req.params.id===alreadyuser.user.id||req.user.role===2)
        {
            const updatedUser = await User.findByIdAndUpdate(
                req.params.id,
                {
                  $set: req.body,
                },
                { new: true }
              );
              return res.status(200).json({
                msg:"user updated"
              })
        }
        else
        {
            return  res.json(401).json({
                msg:"Bad Request"
            })  
        }
    }
    catch{
        return  res.json(500).json({
            msg:"server error"
        })
    }
}
//delete user
const deleteuser=async(req,res)=>{
 try{
        const alreadyuser=await User.findOne({email:req.body.email})
        if(!alreadyuser.isdisabled&&req.params.id===alreadyuser.user.id||req.user.role===2)
        {
            const updatedUser = await User.findByIdAndUpdate(
                req.params.id,
                {
                  $set: req.body,
                },
                { new: true }
              );
              return res.status(200).json({
                msg:"user status updated"
              })
        }
        else
        {
            return  res.json(401).json({
                msg:"Bad Request"
            })   
        }
    }
    catch{
        return  res.json(500).json({
            msg:"server error"
        })
    }
}
//getusers
const getalluser=async(req,res)=>{
    try{
           if(!req.user.isdisabled&&req.user.role===2||req.user.role===1)
           {
            const users = await User.find();
             return res.status(200).json({
                   msg:"users fetched",
                   users:users
                 })
           }
           else
           {
               return  res.json(401).json({
                   msg:"Bad Request"
               })   
           }
       }
       catch{
           return  res.json(500).json({
               msg:"server error"
           })
       }
   }
//get user monthly and yearly bases

module.exports={Signup,Login,Verification,Forgotpassword,Resetpassword,deleteuser,updateuser,getalluser}