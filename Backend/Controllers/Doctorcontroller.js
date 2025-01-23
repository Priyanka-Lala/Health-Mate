import doctormodule from "../Modules/DoctorsModule.js";
import express from 'express';
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import AppointmentModel from "../Modules/appointmentmodel.js";
import { ObjectId } from 'mongodb';
const app = express();
app.use(express.json());



const changeAvailability=async (req,res) => {
    try {
        const{docId}=req.body
        console.log("Received Doctor ID:", docId);
        const docData = await doctormodule.findById(docId)
      
        await doctormodule.findByIdAndUpdate(docId, { available: !docData.available })
        res.json({ success: true, message: 'Availability Changed' })
        
    } catch (error) {
       console.log(error);
       res.json({success:false,message:error.message})
        
    }

}

const doctorlist=async (req,res) => {
   
    try {
        const doctors=await doctormodule.find({}).select(['-password','-email'])
        res.json({success:true,doctors})
    } catch (error) {
        console.log(error);
        res.json({success:false,message:error.message}) 
    }
}
//API for doctor login
const loginDoctor=async (req,res) => {
    try {
        const {email,password}=req.body
        const doctor=await doctormodule.findOne({email})
        if (!doctor) {
          return res.json({success:false,message:"Invalid credentials"})  
        }

    const isMatch=await bcrypt.compare(password,doctor.password)

    if(isMatch){

        const token=jwt.sign({id:doctor._id},process.env.JWT_SERCET)
        res.json({success:true,token})

      
    }else{
        res.json({success:false,message:"Invalid credentials"}) 
    }
    

    } catch (error) {
        console.log(error);
        res.json({success:false,message:error.message})   
    }
}
//API to get doctor appointment for doctor panel
const appointmentDoctor = async (req, res) => {
    try {
        const { docid } = req.body;
      

       // const appointments = await AppointmentModel.find({ "docData._id": docid });
       const appointments = await AppointmentModel.find({ "docData._id": new ObjectId(docid) });
       
     //  console.log("Fetched Appointments:", appointments);

       
        res.json({ success: true, appointments });
        
    } catch (error) {
        console.log("Error fetching appointments:", error);
        res.json({ success: false, message: error.message });
    }
};

//API to mark appointment on doctor panel

const appointmentCompelete=async (req,res) => {
    try {
        const {docid,appointmentId}=req.body
       // console.log("Received docid:", docid);
        const appointmentData= await AppointmentModel.findById(appointmentId)
        
        //console.log("Fetched appointmentData:", appointmentData);
        if (appointmentData && appointmentData.docData._id.toString() === docid){
            await  AppointmentModel.findByIdAndUpdate(appointmentId,{iscomplete:true})

            return res.json({success:true,message:'Appointment compteled'})
        }else{
            return res.json({success:false,message:'Mark Fail'})
        }

        
    } catch (error) {
        console.log("Error fetching appointments:", error);
        res.json({ success: false, message: error.message });  
    }
}

//API to cancel appointment on doctor panel

const appointmentCancel=async (req,res) => {
    try {
        const {docid,appointmentId}=req.body
        const appointmentData= await AppointmentModel.findById(appointmentId)
        if(appointmentData && appointmentData.docid.toString()===docid){
            await  AppointmentModel.findByIdAndUpdate(appointmentId,{cancelled:true})

            return res.json({success:true,message:'Appointment cancelled'})
        }else{
            return res.json({success:false,message:'cancelled Fail'})
        }

        
    } catch (error) {
        console.log("Error fetching appointments:", error);
        res.json({ success: false, message: error.message });  
    }
}

//API to get Doctor Dashboard

const doctorDashbaord=async (req,res) => {
    try {

        const{docid}=req.body
        const appointments = await AppointmentModel.find({ "docData._id": new ObjectId(docid) });
        
        let earning=0

        appointments.map((item)=>{
            if(item.iscomplete || item.payment){
                earning+=item.fee
            }

        })

        
        let patients=[]
        appointments.map((item)=>{
            if (!patients.includes(item.userid)) {
                patients.push(item.userid)
            }
        })
 
        const dashData={
            earning,
            appointments:appointments.length,
            patients:patients.length,
            latestAppointments:appointments.reverse().slice(0,5)
        }
res.json({success:true,dashData})


    } catch (error) {
        console.log( error);
        res.json({ success: false, message: error.message });  
    }
}
//Doctor profile

const doctorprofile=async (req,res) => {

    try {
        
        const{docid}=req.body
        const profiledata=await doctormodule.findById(docid).select('-password')

        res.json({success:true,profiledata})

    } catch (error) {
        console.log( error);
        res.json({ success: false, message: error.message });  
    }
    
}

//API to update 

const updateprofile=async (req,res) => {
    
    try {

        const {docid,fee,address,avaiable}=req.body
        await doctormodule.findByIdAndUpdate(docid,{fee, address,avaiable})
        res.json({success:true,message:"profile updated"})




        
    } catch (error) {
        console.log( error);
        res.json({ success: false, message: error.message })

    }
}

export {changeAvailability,doctorlist,loginDoctor
    ,appointmentDoctor,appointmentCancel
    ,appointmentCompelete,doctorDashbaord,updateprofile,doctorprofile}