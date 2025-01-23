import React, { useContext, useEffect } from 'react';
import { Admincontext } from '../../Context/Admincontext';
import { Assets } from '../../Assets/Asstes';
import { FaSomeIcon } from 'react-icons/fa';


const Dashboard = () => {

  const cancelappointment = (id) => {
    // Add your logic to cancel the appointment here
    console.log(`Cancel appointment with id: ${id}`);
  };

  const completeappointment = (id) => {
    // Add your logic to complete the appointment here
    console.log(`Complete appointment with id: ${id}`);
  };

  const { aToken, dashdata, setDashdata, dashbaordData } = useContext(Admincontext);

  useEffect(() => {
    if (aToken) {
      dashbaordData();
    }
  }, [aToken]);

  return dashbaordData && (
    <div className="m-5">
      <div className='flex flex-wrap gap-3'>
        <div className='flex items-center gap-2 bg-gray-50 p-4 min-w-52 rounded border-2 border-gray-100 cursor-pointer hover:scale-105 transition-all'>
          <img src={Assets.doctor} alt="Doctor" className='' />
          <div>
            <p className='text-xl font-semibold'>{dashdata.doctors}</p>
            <p>Doctors</p>
          </div>
        </div>

        <div className='flex items-center gap-2 bg-gray-50 p-4 min-w-52 rounded border-2 border-gray-100 cursor-pointer hover:scale-105 transition-all'>
          <img src={Assets.medicalrecord} alt="Doctor" />
          <div>
            <p className='text-xl font-semibold'>{dashdata.patient}</p>
            <p>Patient</p>
          </div>
        </div>

        <div className='flex items-center gap-2 bg-gray-50 p-4 min-w-52 rounded border-2 border-gray-100 cursor-pointer hover:scale-105 transition-all'>
          <img src={Assets.online} alt="Doctor" />
          <div>
            <p className='text-xl font-semibold'>{dashdata.appointment}</p>
            <p>Appointment</p>
          </div>
        </div>
      </div>
      <div className='bg-gray-50'>
        <div className='flex items-center gap-2.5 px-1 py-1 mt-10 rounded-t border'>
          <img src={Assets.health} alt='' className='font-semibold' />
          <p>Lastest Booking</p>
        </div>
        <div className='pt-4 border-t-0'>
          {
            dashdata.Lastestappointment && dashdata.Lastestappointment.map((item, index) => (
              <div key={index} className='flex items-center px-6 py-3 gap-3 hover:bg-gray-100'>
                <img src={item.docData.image} alt='' className='rounded-full w-20' />
                <div className='flex-1 text-sm'>
                  <p className='ml-2'>{item.docData.name}</p>
                  <p className='ml-2'>{item.slotDate}</p>
                </div>
                {
                  item.cancelled
                    ? <p className="text-red-400 text-xs font-medium">cancelled</p>
                    : item.iscomplete
                      ? <p className="text-green-500 text-xs font-medium">Completed</p>
                      : <div className="flex gap-2">
                          <img onClick={() => cancelappointment(item._id)} src={Assets.close} alt="" className="w-8 h-8 cursor-pointer" />
                          <img src={Assets.tick} alt="" className="w-8 h-8 cursor-pointer" onClick={() => completeappointment(item._id)} />
                        </div>
                        
                }
              </div>
              
            ))
          }
          </div>
        </div>
      </div>
    
  );
};

export default Dashboard;
