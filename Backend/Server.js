import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import connectDB from './Config/Mongodb.js'
import connectCloudinary from './Config/Cloudinary.js'
import adminRouter from './Routes/adminRoute.js'
import doctorRouter from './Routes/Doctorroute.js'
import userRouter from './Routes/UserRoute.js'
//app config
const app=express()
const port=process.env.PORT || 4000
connectDB()
connectCloudinary()


//middlewares
app.use(express.json())
app.use(cors())


//API endpoints
app.use('/api/admin',adminRouter)
//Localhost 4000/api/admin/addDoctors
app.use('/api/doctor',doctorRouter)
app.use('/api/user',userRouter)
app.get('/',(req,res)=>{
    res.send('API working..!!')
})

//To start express app
app.listen(port,()=>console.log("server started",port))