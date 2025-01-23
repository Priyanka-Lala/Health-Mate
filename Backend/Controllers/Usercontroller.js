import validator from 'validator';
import bcrypt from 'bcrypt';
import usermodule from '../Modules/Usermodule.js';
import jwt from 'jsonwebtoken'
import{v2 as cloudinary} from 'cloudinary'
import doctormodule from '../Modules/DoctorsModule.js';
import AppointmentModel from '../Modules/appointmentmodel.js';
import moment from 'moment';
import razorpay from 'razorpay'
//Api for register user
const registeruser=async(req,res)=>{
    try {
      const{username,email,password}=req.body;
      if(!username || !email|| !password)  {
        return res.json({success:false,message:"Missing details"})
      }
      //checking if email is valid
      if(!validator.isEmail(email)){
        return res.json({success:false,message:"Enter vaild email"})
      }
      //checking if password is strong
      if(password.length<8){
        return res.json({success:false,message:"Enter strong password"})
      }
      //hashing user password
      const salt= await bcrypt.genSalt(5);
      const hashpasword=await bcrypt.hash(password,salt)

      const userData={username,email,password:hashpasword}

      const newUser=new usermodule(userData)
      const User=await newUser.save()
      //_id
     //APi fotr Token
const token =jwt.sign({id:User._id},process.env.JWT_SERCET)


res.json({success:true,token})

    } catch (error) {
        console.log(error)
        res.json({success:false,message:error.message})

    }
}
//Api for user login
const loginuser=async (req,res) => {
    try {
        const{email,password}=req.body;
        const user=await usermodule.findOne({email})
        console.log('Finding user with email:', email);

        if(!user){
          return  res.json({success:false,message:"user not exist"})
        }
        const isMatch=await bcrypt.compare(password,user.password)
        if(isMatch){
            const token=jwt.sign({id:user._id},process.env.JWT_SERCET)
            console.log('JWT_SECRET:', process.env.JWT_SERCET);

            res.json({success:true,token})
        }
        else{
          
          
            res.json({success:false,message:"Invalid credentials"})
        }
    } catch (error) {
        console.log(error)
        res.json({success:false,message:error.message})
    }
}

//Api for user profile
const userprofile=async(req,res)=>{
    try {
      const {userid}=req.body
      const userdata=await usermodule.findById(userid).select('-password')
      res.json({success:true,userdata})

    } 
    catch (error) {
      console.log(error)
      res.json({success:false,message:error.message})
    }
  }
  //API to update user profile
  const updateprofile=async (req,res) => {
    try {
      const {userid,username,address,phone,DOB,gender,age,email}=req.body;
      console.log('Received details:', { userid, username, address, phone, DOB, gender, age, email });
      const imagefile=req.file
      if(!username||  !phone|| !DOB|| !gender||  !email ){
        return res.json({success:false,message:"Missing details"})

      }
      await usermodule.findByIdAndUpdate(userid,{username,phone,address:JSON.parse(address),DOB,gender,age,email})
      if(imagefile){
        //upload image to cloudinary
        const imageupload=await cloudinary.uploader.upload(imagefile.path,{resource_type:"image"})
        const imageURL=imageupload.secure_url
        await usermodule.findByIdAndUpdate(userid,{image:imageURL})
      }
      res.json({success:true,message:"profile updated"})
    } catch (error) {
      console.log(error)
      res.json({success:false,message:error.message})
    }
  }
//Api to book appointment

const bookapointment=async (req,res) => {
  try {
   
    const { userid, docid, slotDate, slotTime } = req.body;
    console.log(slotTime);
    
  const formatedDate = moment(slotTime, "HH:mm:ss").isValid() ? moment(slotTime, "HH:mm:ss A").format("HH:mm:ss A") : "Invalid date";
  if (formatedDate === "Invalid date") {
    return res.json({ success: false, message: "Invalid slot time format" });
  }
  console.log(formatedDate)
    const docData = await doctormodule.findById(docid).select('-password');
    if (!docData.available) {
      return res.json({ success: false, message: "Doctor not available" });
    }
    console.log("Doctor Data:", docData);
    let slot_booked = docData.slot_booked;

    // Checking for slot availability
    if (slot_booked[slotDate]) {
      if (slot_booked[slotDate].includes(formatedDate)) {
        return res.json({ success: false, message: "Slot not available" });
      } else {
        slot_booked[slotDate].push(formatedDate);
      }
    } else {
      slot_booked[slotDate] = [];
      slot_booked[slotDate].push(formatedDate);
    }

    const userData = await usermodule.findById(userid).select('-password');
   
 // delete docData.slot_booked;

  const appointmentData = {
      userid,
      docid,
      userData,
      docData,
      slotTime:formatedDate,
      slotDate,
      
      date:Date.now()
    };
   
    const newAppointment = new AppointmentModel(appointmentData);
    await newAppointment.save();

    // Save new slot data in doctor data
    const updatedDoctor = await doctormodule.findByIdAndUpdate(docid, { slot_booked });
    console.log("Updated Doctor Data:", updatedDoctor);
    
    res.json({ success: true, message: "Appointment booked" });

    } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};
//API to get the appointment on frontend

const listAppointment=async (req,res) => {
  try {
    const {userid}=req.body
    console.log("User ID:", userid);
    const appointment=await AppointmentModel.find({userid})
    res.json({success:true,appointment})
    
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message }); 
  }
}
// API to cancel the appointment
const cancelappointment = async (req, res) => {
  try {
    const { userid, appointmentid } = req.body;
    
    const appointmentData = await AppointmentModel.findById(appointmentid);
    
    // Verify appointment user
    if (appointmentData.userid !== userid) {
      return res.json({ success: false, message: 'Unauthorized action' });
    }

    // Mark appointment as cancelled
    await AppointmentModel.findByIdAndUpdate(appointmentid, { cancelled: true });
    
    // Releasing the slot
    const { slotDate, slotTime } = appointmentData;

    // Correctly access doctor ID from docData
    const docid = appointmentData.docData._id;

    console.log("Doctor ID:", docid); // Log the doctor ID for debugging

    const docData = await doctormodule.findById(docid);
    
    if (!docData) {
      return res.json({ success: false, message: 'Doctor not found' });
    }

    let slot_booked = docData.slot_booked;

    if (!slot_booked || !slot_booked[slotDate]) {
      return res.json({ success: false, message: 'No slots found for this date' });
    }

    // Remove the slot time from the booked slots
    slot_booked[slotDate] = slot_booked[slotDate].filter(e => e !== slotTime);

    // Update doctor's slot booking data
    await doctormodule.findByIdAndUpdate(docid, { slot_booked });

    res.json({ success: true, message: "Appointment cancelled" });

  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

const razorpayInstance=new razorpay({
  key_id:process.env.RAZORPAY_KEY_ID,
  key_secret:process.env.RAZORPAY_KEY_SECRET,
})
//API to make payment of appointment using razorpay

const paymentRazorpay= async (req,res) => {
  try {
    const {appointmentid}=req.body
    const appointmentData=await AppointmentModel.findById(appointmentid)
    
  if (!appointmentData || appointmentData.cancelled) {
    return ({success:false,message:"Appointment cancelled or not found"})
  }
  console.log('Appointment Data:', appointmentData);
  console.log('Appointment Amount:', appointmentData.amount);

  //Creating option of paymnet
  const options={
    amount:appointmentData.docData.fee *100,
    currency:process.env.CURRENCY,
    receipt:appointmentid,
  }
  //Creation of order
  const order=await razorpayInstance.orders.create(options)
  console.log('Razorpay Order:', order); 
  res.json({success:true,order})
  
  }
    
   catch (error) {
    console.log(error);
    
    res.json({ success: false, message: error.message });
  }
}
// APi to verify payment of razorpay
const verifyRazorpay=async (req,res) => {
  try {
    const {razorpay_order_id}=req.body
    const orderinfo=await razorpayInstance.orders.fetch(razorpay_order_id)
   // console.log(orderinfo);
    if (orderinfo.status==='paid') {
      await AppointmentModel.findByIdAndUpdate(orderinfo.receipt,{payment:true})
      res.json({success:true,message:"payment successful"})
    }else{
      res.json({success:false,message:"payment falied"})
    }
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
}
export {registeruser,loginuser, userprofile,
  updateprofile,bookapointment,listAppointment,cancelappointment,paymentRazorpay,verifyRazorpay}