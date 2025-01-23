import React, { useContext, useEffect, useState } from 'react'
import { Doctorcontext } from '../../Context/Doctorcontext'
import { Appcontext } from '../../Context/Appcontext'
import './profile.css'
import axios from 'axios'
import { toast } from 'react-toastify'
function Doctorprofile() {
  const { profiledata, setProfiledata, getProfileData, dToken , backendurl} = useContext(Doctorcontext)
  const { currency } = useContext(Appcontext)
 const updateprofile=async (params) => {
  try {

    const updateData={
      address:profiledata.address,
      fee:profiledata.fee,
      available:profiledata.available
    }

    const{data}=await axios.post(backendurl+'/api/doctor/update-profile',updateData,{headers:{dToken}})
    if (data.success) {
      toast.success(data.message)
      setEdit(false)
      getProfileData()
    }else{
      toast.error(data.message)
    }
    
  } catch (error) {
    toast.error(error.message)
    console.log(error);
    
  }
 }

const [edit,setEdit]=useState(false)
  useEffect(() => {
    if (dToken) {
      getProfileData()
    }
  }, [dToken])

  return profiledata && (
    <div>
      <div className='flex flex-col gap-4 m-5'>
        <div>
          <img src={profiledata.image} alt='' className=' sm:max-w-60 rounded-lg' />
        </div>
        <div className='flex-1 border rounded-lg p-8 py-7 bg-white'>
          {/* Doc info */}
          <p className='flex items-center gap-2 text-3xl font-medium'>{profiledata.name}</p>
          <div className='flex items-center gap-2  text-gray-500'>
            <p>{profiledata.degree}-{profiledata.specialization}</p>
            <button className='mb-3 py-0.5 px-2 border text-xs rounded-full  text-gray-500'>{profiledata.experience}</button>
          </div>
          {/* About Doc */}
          <div>
            <p className='flex items-center gap-1 font-medium text-neutral-800 mt-3'>About</p>
            <p className='text-sm text-gray-600 max-w-[700px] mt-1'>{profiledata.about}</p>
          </div>
          <p>Appointment fee:<span className='text-gray-800'>{currency} {edit ? <input type='number' onChange={(e)=>setProfiledata(prev=>({...prev,fee:e.target.value}))} value={profiledata.fee}/> :profiledata.fee}</span></p>
          <div className='flex gap-2 py-2'>
            <p>Address:</p>
            
            <p className=''  >{ edit ? <input type='text' onChange={(e)=>setProfiledata(prev=>({...prev,address:{...prev.address,line1:e.target.value}}))} value={profiledata.address.line1}/>:profiledata.address.line1}</p>
          </div>

          <div className='flex gap-1 pt-2'>
            <input  onChange={()=>edit&& setProfiledata(prev=>({...prev,available:!prev.available}))}type='checkbox' name='' id='' checked={profiledata.available}/>
            <label htmlFor=''>Available</label>
          </div>
          {
            edit ?  
            <button className='px-4 py-1 border text-sm rounded-full mt-5 hover:bg-blue-200 transition-all' onClick={updateprofile}>Save</button> 
            : <button className='px-4 py-1 border text-sm rounded-full mt-5 hover:bg-blue-200 transition-all' onClick={()=>setEdit(true)}>Edit</button>
          }
        </div>
      </div>
    </div>
  )
}

export default Doctorprofile
