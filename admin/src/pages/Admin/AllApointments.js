import React, { useContext, useEffect } from 'react';
import { Admincontext } from '../../Context/Admincontext';
import './appointment.css';
import { Appcontext } from '../../Context/Appcontext';
import { Assets } from '../../Assets/Asstes';

const AllApointments = () => {
  const { aToken, appointments, setAppointments, getallappointments,cancelappointment } = useContext(Admincontext);
  const { calulateage, currency } = useContext(Appcontext);

  useEffect(() => {
    if (aToken) {
      getallappointments();
      console.log(getallappointments());
    }
  }, [aToken]);

  return (
    <div className='appointment_heading'>
      <p className='head'>All Appointments</p>
      <div className='appointment_details'>
        <div className='hidden sm:grid grid-cols-[1fr_3fr_1fr_2fr_3fr_1fr_1fr] grid-flow-col py-3 px-6 border-b'>
          <p>Sr.no</p>
          <p>Patient</p>
          <p>Age</p>
          <p>Date & Time</p>
          <p>Doctor</p>
          <p>Fees</p>
          <p>Action</p>
        </div>
        {appointments.map((item, index) => (
          <div key={index} className='flex flex-wrap justify-between max-sm:gap-2 sm:grid grid-cols-[1fr_3fr_1fr_2fr_3fr_1fr_1fr] items-center text-gray-500 py-3 px-6 border-b hover:bg-gray-100'>
            <p className='max-sm:hidden'>{index + 1}</p>
            <div className='flex items-center gap-2'> 
              {item.userData && item.userData.image ? (
                <img src={item.userData.image} alt='Patient' className='w-20 rounded-full ' />
              ) : (
                <img src={Assets.icon} alt='' className='w-20 rounded-full'/>
              )}
              {item.userData && item.userData.username ? (
                <p>{item.userData.username}</p>
              ) : (
                <p></p>
              )}
            </div>
            <p className='max-sm:hidden'>{item.userData && item.userData.DOB ? calulateage(item.userData.DOB) : ''}</p>
            <p className='mr-9'>{item.slotDate}- <br/>{item.slotTime}</p>
            <div className='flex items-center gap-2'>
              <img src={item.docData.image} alt='' className='w-20 rounded-full '/> 
              <p className='mt-2 text-center'>{item.docData.name}</p>
            </div>
            <p>{currency}{item.docData.fee}</p>
            {item.cancelled ? <p className='text-red-400 text-xs font-medium'>Cancelled</p>: item.iscomplete 
            ? <p className='text-green-500 text-xs font-medium'>Completed</p> 
            :<img src={Assets.close} alt='' className='h-10 w-10' onClick={()=>cancelappointment(item._id)}/>}
          </div>
        ))}
      </div>
    </div>
  );
}

export default AllApointments;
