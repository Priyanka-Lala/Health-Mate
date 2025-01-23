import { createContext, useState } from "react";
import axios from 'axios'
import {toast} from 'react-toastify'



export const Doctorcontext= createContext()

const DoctorContextProvider=(props)=>{
const backendurl= "http://localhost:4000"
const [dToken,setDToken]=useState(localStorage.getItem('dToken')?localStorage.getItem('dToken'):'')
const [apointments,setAppointments]=useState([])
const [dashData,setDashData]=useState(false)
const [profiledata,setProfiledata]=useState(false)
const getAppointment=async (params) => {
    
    try {
        
const {data}=await axios.get(backendurl+'/api/doctor/appointments',{headers:{dToken}})

if (data.success) {
    setAppointments(data.appointments)
    console.log(data.appointments);
    
    
} else {
   toast.error(data.message) 
}

    } catch (error) {
        console.log(error);
        toast.error(error.message)
        
    }
}
//complete Appointment
const completeappointment=async (appointmentId) => {
  try {
    const {data}=await axios.post(backendurl +'/api/doctor/complete-appointment',{appointmentId},{headers:{dToken}})
    if (data.success) {
        toast.success(data.message)
        getAppointment()
    }else{
        toast.error(data.message)
    }
    
  } catch (error) {
    console.log(error);
        toast.error(error.message)
  }  
}

//cancel Appointment
const cancelappointment=async (appointmentId) => {
    try {
      const {data}=await axios.post(backendurl +'/api/doctor/cancel-appointment',{appointmentId},{headers:{dToken}})
      if (data.success) {
          toast.success(data.message)
          getAppointment()
      }else{
          toast.error(data.message)
      }
      
    } catch (error) {
      console.log(error);
      toast.error(error.message)
    }  
  }

const getDashData=async (params) => {
    try {
        const {data}=await axios.get(backendurl+ '/api/doctor/dashboard',{headers:{dToken}})

      if (data.success) {
        setDashData(data.dashData)
        console.log(data.dashData);
        
        
      } else {
        toast.error(data.message)
      }
    } catch (error) {
        console.log(error);
        toast.error(error.message)
    }
}

const getProfileData=async (params) => {
  
try {

  const {data}=await axios.get(backendurl+'/api/doctor/profile',{headers:{dToken}})

  if (data.success) {
    setProfiledata(data.profiledata)
    console.log(data.profiledata)
    
  } 
  
} catch (error) {
  console.log(error);
  toast.error(error.message)
}

}

const value={
dToken,
setDToken,
backendurl,
apointments,
getAppointment,
setAppointments,
completeappointment,
cancelappointment,
dashData,setDashData,
getDashData,
profiledata,setProfiledata,getProfileData
}



return(
<Doctorcontext.Provider value={value}>
    {props.children}
</Doctorcontext.Provider>

)
}

export default DoctorContextProvider