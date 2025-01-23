import React, { useContext,useEffect } from 'react'
import './Doctorlist.css'
import { Admincontext } from '../../Context/Admincontext'

const Doctorlist = () => {
  const {doctors,getAlldoctor,aToken,changeAvailability}=useContext(Admincontext)

  useEffect(() => { if (aToken) 
    { 
      getAlldoctor(); 

    } }, [aToken,getAlldoctor]);
  return (
    <div className='m-5 max-h-[90vh] '>
    <h3 className='text-lg font-medium'>All Doctors</h3>
    <div className='flex flex-wrap w-full gap-4 pt-5 gap-y-6'>
      {
        doctors.map((items,index)=>(
          <div className=" doctor_data border rounded-xl max-w-56 overflow-hidden group cursor-pointer" key={index}>
            <img className='w-60 h-60' src={items.image} alt=''/>
            <div className='p-4'> 
              <p className='text-neutral-500 text-lg font-medium'>{items.name}</p>
              <p className='text-zinc-600 font-semibold'>{items.specialization}</p>
              <div className=' mt-3 flex item-center gap-2'>
                <input onChange={()=>changeAvailability(items._id)} type='checkbox' checked={items.available}/>
                <p className=''>Available</p>
              </div>
            </div>
          </div>
        ))
      }
    </div>
    </div>
  )
}

export default Doctorlist
