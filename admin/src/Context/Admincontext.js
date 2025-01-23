import { createContext, useState } from "react";
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
export const Admincontext= createContext()

const AdminContextProvider=(props)=>{
const [aToken,setAToken]=useState(localStorage.getItem('aToken')?localStorage.getItem('aToken'):'')
const[doctors,setDoctors]=useState([])
const [appointments,setAppointments]=useState([])
const [dashdata,setDashdata]=useState({})
const backendurl= "http://localhost:4000"
const getAlldoctor=async () => {
    try {
        const {data}=await axios.post(backendurl+'/api/admin/all-doctors',{},{headers:{aToken}})

        if (data.success) {
          setDoctors(data.doctors) 
          console.log(data.doctors) 
        }
        else{
            toast.error(data.error)
        }
    } catch (error) {
        toast.error(error.message)
    }
}


const changeAvailability=async (docId) => {
  try {
    const {data}= await axios.post(backendurl+'/api/admin/change-availability',{docId},{headers:{aToken}})
    if (data.success) {
        toast.success(data.message)
        getAlldoctor()
    }else{
        toast.error(data.message)
    }
  } catch (error) {
    toast.error(error.message)
  }
    
}
const getallappointments=async (params) => {
  try {
    const {data}=await axios.get(backendurl+'/api/admin/appointments',{headers:{aToken}})
    if (data.success) {
      setAppointments(data.appointments)
      console.log(data.appointments);
      
    }
    else{
      toast.error(data.message)
    }
  } catch (error) {
    toast.error(error.message)
  }
}

const cancelappointment=async (appointmentid) => {
  try {
    const{data}=await axios.post(backendurl+'/api/admin/cancel-appointment',{appointmentid},{headers:{aToken}})
    if (data.success) {
      toast.success(data.success)
      getallappointments()
    } else {
      toast.error(data.message)
    }
    
  } catch (error) {
    toast.error(error.message)
  }
}


const dashbaordData=async (params) => {
 try {
  const {data}= await axios.get(backendurl+ '/api/admin/dashboard',{headers:{aToken}})
  console.log("Backend Response:", data);
  if (data.success) {
    setDashdata(data.dashData)
    console.log("Dashboard data set:", data.dashData);
    
    
  } else {
    toast.error(data.error)
  }
 } catch (error) {
  toast.error(error.message)
 }

}

const value = {
  aToken,
  setAToken,
  backendurl,
  getAlldoctor,
  doctors,
  changeAvailability,
  appointments,
  setAppointments,
  getallappointments,
  cancelappointment,
  dashdata,
  dashbaordData
}



return(
<Admincontext.Provider value={value}>
    {props.children}
</Admincontext.Provider>

)
}

export default AdminContextProvider