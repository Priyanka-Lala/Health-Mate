import React, { useContext, useEffect } from "react";
import { Doctorcontext } from "../../Context/Doctorcontext";
import { Assets } from "../../Assets/Asstes";
import { Appcontext } from "../../Context/Appcontext";

const Doctorappointment = () => {
  const { dToken, apointments, getAppointment,completeappointment,cancelappointment } = useContext(Doctorcontext);
const {calulateage,currency}=useContext(Appcontext)
  useEffect(() => {
    if (dToken) {
      getAppointment();
    }
  }, [dToken]);

  return (
    <div className="w-full max-w-full m-5">
      <p className="mb-3 text-lg font-medium">Hello Doctor</p>
      <div className="bg-white border rounded text-sm max-h-[80vh] min-h-[50vh] overflow-x-scroll">
        <div className="hidden sm:grid grid-cols-[1fr_2fr_2fr_2fr_3fr_1fr_1fr] grid-flow-col py-3 px-6 border-b ">
          <p>Sr.no</p>
          <p>Patient</p>
          <p>Payment</p>
          <p>Age</p>
          <p>Date & Time</p>
          
          <p>Fees</p>
          <p>Action</p>
        </div>
        {apointments.reverse().map((item, index) => (
          <div key={index} className="flex flex-wrap justify-between max-sm:gap-5 sm:grid grid-cols-[0.5fr_2fr_2fr_1fr_3fr_1fr_1fr] gap-1 items-center py-3 px-6 border-b hover:bg-gray-300 transition-all">
            <p className="max-sm:hidden">{index + 1}</p>
            <div className="flex items-center gap-2">
  {item.userData && item.userData.image ? (
    <img
      src={item.userData.image}
      alt="Patient"
      className="w-8 h-8 rounded-full"
    />
  ) : (
    <img src={Assets.icon} alt="" className="w-8 h-8 rounded-full" />
  )}
  {item.userData && item.userData.username ? (
    <p>{item.userData.username}</p>
  ) : (
    <p></p>
  )}
</div>
<div className="text-sm px-5  mb-3 rounded-full w-10">
  {item.payment ? 'Online' : 'Cash'}
</div>
<p>{calulateage(item.userData.DOB)}</p>
<p>{item.slotDate}-{item.slotTime}</p>
<p>{currency}{item.docData.fee}</p>
{
  item.cancelled
  ?<p className="text-red-400 text-xs font-medium">cancelled</p>
  :item.iscomplete
  ?<p className="text-green-500 text-xs font-medium" >Completed</p>
  :

<div className="flex gap-2"> {/* Add this line to make the container flexible */}
  <img onClick={()=>(cancelappointment(item._id))} src={Assets.close} alt="" className="w-8 h-8 cursor-pointer"/> {/* Adjust width and height as needed */}
  <img src={Assets.tick} alt="" className="w-8 h-8 cursor-pointer" onClick={()=>(completeappointment(item._id))}/> {/* Adjust width and height as needed */}
</div>
}
</div>
          
        ))}
      </div>
    
    </div>
  );
};

export default Doctorappointment;
