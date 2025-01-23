import express from 'express';
import { registeruser,loginuser, userprofile,updateprofile,bookapointment, listAppointment,cancelappointment,paymentRazorpay,verifyRazorpay} from '../Controllers/Usercontroller.js';
import authuser from '../Middleware/Authuser.js';
import upload from '../Middleware/Multer.js';

const userRouter=express.Router();

userRouter.post('/register',registeruser)
userRouter.post('/login',loginuser)
userRouter.get('/getprofile',authuser,userprofile)
userRouter.post('/update-profile',upload.single('image'),authuser,updateprofile)
userRouter.post('/book-appointment',authuser,bookapointment)
userRouter.get('/appointments', authuser, listAppointment);
userRouter.post('/cancel-appointment',authuser,cancelappointment)
userRouter.post('/payment-razorpay',authuser,paymentRazorpay)
userRouter.post('/verifyRazorpay',authuser,verifyRazorpay)

export default userRouter;