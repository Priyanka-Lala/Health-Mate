import validator from 'validator';
import bcrypt, { hash } from 'bcrypt'
import {v2 as cloudinary} from 'cloudinary'
import doctormodule from '../Modules/DoctorsModule.js';
import jwt from 'jsonwebtoken'
import AppointmentModel from '../Modules/appointmentmodel.js';
import usermodule from '../Modules/Usermodule.js';
//ApI for adding doctors

const addDoctor=async (req,res)=>{

    try {
        const{name ,email ,password,specialization,degree,experience,fee,about , address}=req.body
        const imagefile=req.file

        // console.log({name ,email ,password,specialization,degree,experience,fee,about , address},imagefile);

        //checking for all the doctors data
        if (!name || !email || !password || !specialization || !degree || !experience || !fee || !about || !address)  {
             return res.json({success:false,message:"Details missing"})
            
        } 
        //Validating email format
        if (!validator.isEmail(email)) {
            return res.json({success:false,message:"Details missing"})     
        }
        //Validating password
        if (password.lenght<8) {
            return res.json({success:false,message:"Enter strong Password"}) 
        }

        //Hashing Doctor password
        const salt= await bcrypt.genSalt(5)
        const hashedpassword =await bcrypt.hash(password,salt)

        //Upload image to cloudinary
        const imageupload=await cloudinary.uploader.upload(imagefile.path,{resource_type:"image"})
        const imageUrl=imageupload.secure_url;

        const Doctordata={
            name,
            email,
            password:hashedpassword,
            image:imageUrl,
            specialization,
            degree,
            experience,
            about,
            fee,
            address:JSON.parse(address),
            date:Date.now()
        }

        const newDoctor= new doctormodule(Doctordata)
        await newDoctor.save()

        res.json({success:true,message:"Doctor Added"})
    } catch (error) {
        console.log(error)
        res.json({success:false,message:error.message})
        
    }
}

//API for Admin Login

const Loginadmin= async (req,res) => {
   try {
    const {email,password}=req.body
    
    if (email===process.env.ADMIN_EMAIL && password===process.env.ADMIN_PASSWORD) {
        const token=jwt.sign(email+password,process.env.JWT_SERCET) 
        res.json({success:true,token}) 
    }
    else{
        res.json({success:false,message:"Invalid creadinatials"})
       
       
    }
   } catch (error) {
    console.log(error)
    res.json({success:false,message:error.message})
        
   } 
}

//API to get all doctors list to get on admin panel

const allDoctors = async (req,res) => {
    try {
        
const doctors=await doctormodule.find({}).select('-password')
res.json({success:true,doctors})

    } catch (error) {
        console.log(error)
    res.json({success:false,message:error.message})
    }
}
//API to get API list
const appointmentsAdmin=async (req,res) => {
    try {
      const appointments=await AppointmentModel.find({})
      res.json({success:true,appointments})
      
    } catch (error) {
      console.log(error)
      res.json({success:false,message:error.message})
    }
  }

  //API for cancellation
  const cancelappointmentAdmin = async (req, res) => {
    try {
      const { appointmentid } = req.body;
      
      const appointmentData = await AppointmentModel.findById(appointmentid);
      
     
      
  
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
  //API to get dashboard data 
  const adminDashboard=async (req,res) => {
    try {
      const doctors=await doctormodule.find({})
      const users=await usermodule.find({})
      const appointment= await AppointmentModel.find({})

      const dashData={
        doctors:doctors.length,
        patient:users.length,
        appointment:appointment.length,
        Lastestappointment:appointment.reverse().slice(0,5)
      }
res.json({success:true,dashData})
    } catch (error) {
      console.log(error);
      res.json({ success: false, message: error.message });
    }
  }
export {addDoctor,Loginadmin,allDoctors,appointmentsAdmin,cancelappointmentAdmin,adminDashboard}