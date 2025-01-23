import React, { useContext, useEffect } from 'react'
import { Doctorcontext } from '../../Context/Doctorcontext'
import { Assets } from '../../Assets/Asstes'

const Doctordashboard = () => {
const{dToken,dashData,setDashData,getDashData,completeappointment, cancelappointment}=useContext(Doctorcontext)

useEffect(()=>{

  if(dToken){
    getDashData()
  }

},[dToken])

  return dashData && (
    <div>
        <div className='flex flex-wrap gap-3'>
          <div className='flex items-center gap-2 bg-gray-50 p-4 min-w-52 rounded border-2 border-gray-100 cursor-pointer hover:scale-105 transition-all'>
            <img src={Assets.profits} alt="Doctor" className=''/>
            <div>
              <p className='text-xl font-semibold'>{dashData.earning }</p> 
              <p>Earning</p>
            </div>
          </div>
    
          <div className='flex items-center gap-2 bg-gray-50 p-4 min-w-52 rounded border-2 border-gray-100 cursor-pointer hover:scale-105 transition-all'>
            <img src={Assets.medicalrecord} alt="Doctor" />
            <div>
              <p className='text-xl font-semibold'>{dashData.patients}</p> 
              <p>Patient</p>
            </div>
          </div>
    
          <div className='flex items-center gap-2 bg-gray-50 p-4 min-w-52 rounded border-2 border-gray-100 cursor-pointer hover:scale-105 transition-all'>
            <img src={Assets.online} alt="Doctor" />
            <div>
              <p className='text-xl font-semibold'>{dashData.appointments}</p> 
              <p>Appointment</p>
            </div>
          </div>
        </div>
           <div className='bg-gray-50'>
              <div className='flex items-center gap-2.5 px-1 py-1 mt-10 rounded-t border'>
             
             <img src={Assets.health} alt='' className='font-semibold'/>
             <p>Lastest Booking</p>
              </div>
              <div className='pt-4 border-t-0'>
        {
          dashData.latestAppointments && dashData.latestAppointments.map((item,index)=>(
            <div key={index} className='flex items-center px-6 py-3 gap-3 hover:bg-gray-100'>
        <img src={item.userData.image} alt=''className='rounded-full w-20'/>
        <div className='flex-1 text-sm'>
          <p className='ml-2'>{item.userData.username}</p>
          <p className='ml-2'>{item.slotDate}</p>
        </div>
         {item.cancelled ? <p className='text-red-400 text-xs font-medium'>Cancelled</p>:
         <img src={Assets.close} alt='' className='h-10 w-10' onClick={()=>cancelappointment(item._id)}/>}
        
            </div>
          ))
        }
              </div>
            </div>
    </div>
  )
}

export default Doctordashboard
