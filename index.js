const express=require("express")
const app=express()
const dotenv=require("dotenv")
const cors=require("cors")
const connection=require("./config/connection")
const users=require("./routes/Userroute")
const products=require("./routes/Productroute")
const payment=require("./routes/payment")
const order=require('./routes/Orderroute')
connection()
app.use(cors())
dotenv.config()
app.use(express.json())
app.use("/eshop/users",users)
app.use("/eshop/products",products)
app.use("/eshop/confirm",payment)
app.use("/eshop/ordersection",order)
app.listen(process.env.PORT,()=>{
    console.log("server is running at ",process.env.PORT)
})