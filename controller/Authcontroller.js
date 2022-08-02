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
        html: `<a href=http://localhost:3000/eshop/users/verification/${token}>Confirm Your Account</a>`, // html body
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
            username:req.body.username,
            email:req.body.email,
            password:req.body.password,
            role:req.body.role,
            profile:req.body.profile
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
        if(user)
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


module.exports={Signup,Login,Verification}