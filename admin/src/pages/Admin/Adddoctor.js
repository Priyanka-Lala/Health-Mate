import React, { useContext, useState } from "react";
import "./Adddoctors.css";
import axios from 'axios';
import {toast} from 'react-toastify'
import { Assets } from "../../Assets/Asstes";
import { Admincontext } from "../../Context/Admincontext";
const Adddoctor = () => {
  const [docImage,setDocImage]=useState(false)
  const [docName,setDocName]=useState('')
  const [docEmail,setDocEmail]=useState('')
  const [docPassword,setDocPassword]=useState('')
  const [docExperience,setDocExperience]=useState('1 year')
  const [docSpeciality,setDocSpecilty]=useState('General physician')
  const [docFee,setDocFee]=useState('')
  const [docAbout,setDocAbout]=useState('')
  const [docDegree,setDocDegree]=useState('')
  const [docAddress,setDocAddress]=useState('')

const {backendurl,aToken}=useContext(Admincontext)

const onSubmithandler=async (event) => {
  event.preventDefault()
  console.log("submitted",event)
 
  try {
    if (!docImage) {
      return toast.error('Image not Selected')
    }
    const formData=new FormData ()
    formData.append('image',docImage)
    formData.append('name',docName)
    formData.append('email',docEmail)
    formData.append('password',docPassword)
    formData.append('experience',docExperience)
    formData.append('specialization',docSpeciality)
    formData.append('about',docAbout)
    formData.append('degree',docDegree)
    formData.append('fee',Number(docFee))
    formData.append('address',JSON.stringify({line1:docAddress}))

    //Console Data for Each
    // formData.forEach((value,key) => {
    //   console.log(`${key}:${value}`);
    // });
    for (let [key, value] of formData.entries()) {
      console.log(`${key}: ${value}`);
    }

const {data}=await axios.post(backendurl+'/api/admin/add-doctor',formData,{headers:{aToken}})
console.log("Backend URL:", backendurl);


if (data.success) {
  toast.success(data.message)
  setDocImage(false)
  setDocName('')
  setDocPassword('')
  setDocFee('')
  setDocDegree('')
  setDocAddress('')
  setDocAbout('')
  setDocEmail('')

}
else{
  toast.error(data.message)
}

  } catch (error) {
    toast.error(error.message)
    console.log(error);
    
  }}



  return (
    <form className="form" onSubmit={onSubmithandler}>
      <p className="header">Add Doctor</p>
      <div className="form_data ">
        {/* Image  */}
        <div className="form_contain">
          <label htmlFor="doc_image" className="">
            <img src={docImage?URL.createObjectURL(docImage):Assets.user} alt="" className="upload_pic rounded-full"></img>
          </label>
          <input onChange={(e)=>setDocImage(e.target.files[0])} type="file" id="doc_image" hidden />
          <p>
            upload Doctor's <br /> picture
          </p>
        </div>

        <div className="  items-start gap-10 text-gray-600">
          <div className="w-full lg-flex-1 flex flex-col gap-3">
            <div className="flex-1 flex flex-col gap-1" >
              <p className="mb-0 mt-3">Doctor's Name</p>
              <input onChange={(e)=>setDocName(e.target.value)} value={docName}className="border rounded px-3 py-2"type="text" placeholder="Doctor Name" required />
            </div>
          </div>
          
            <div className="flex-1 flex flex-col gap-1" >
              <p className="mb-0 mt-3">Doctor's Email</p>
              <input onChange={(e)=>setDocEmail(e.target.value)} value={docEmail}  className="border rounded px-3 py-2"type="email" placeholder="email Name" required />
            </div>
          
          
            <div className="flex-1 flex flex-col gap-1" >
              <p className="mb-0 mt-3">Set Password</p>
              <input onChange={(e)=>setDocPassword(e.target.value)} value={docPassword} className="border rounded px-3 py-2" type="password" placeholder="Password" required />
          </div>
          
            <div className="flex-1 flex flex-col gap-1" >
              <p className="mb-0 mt-3">Experience</p>
              <select name="" id="" className="border rounded px-3 py-2" onChange={(e)=>setDocExperience(e.target.value)} value={docExperience}>
                <option value="1 year">1 year</option>
                <option value="2 year">2 year</option>
                <option value="3 year">3 year</option>
                <option value="4 year">4 year</option>
                <option value="5 year">5 year</option>
              </select>
            </div>
          
          
            <div className="flex-1 flex flex-col gap-1" >
              <p className="mb-0 mt-3">Fee</p>
              <input onChange={(e)=>setDocFee(e.target.value)} value={docFee} className="border rounded px-3 py-2" type="number" placeholder="Fee" required />
            </div>
          
          {/* Right side */}
          <div className="w-full lg:flex-1 flex flex-col gap-4">
            <div className="flex-1 flex flex-col gap-1" >
              <p className="mb-0 mt-3">Speciality</p>
              <select name="" id="" className="border rounded px-3 py-2" onChange={(e)=>setDocSpecilty(e.target.value)} value={docSpeciality}>
                <option value="General physician">General physician</option>
                <option value="Dermatology">Dermatology</option>
                <option value="Pediatrician">Pediatrician</option>
                <option value="Cardiologist">Cardiologist</option>
                <option value="Neurologist">Neurologist</option>
              </select>
            </div>
          
            <div className="flex-1 flex flex-col gap-1" >
              <p className="mb-0 mt-3">Educational degree</p>
              <input onChange={(e)=>setDocDegree(e.target.value)} value={docDegree} className="border rounded px-3 py-2" type="text" placeholder="Degree" required />
            </div>
         
            
            <div className="flex-1 flex flex-col gap-1" >
              <p className="mb-0 mt-3">Address</p>
              <input onChange={(e)=>setDocAddress(e.target.value)} value={docAddress} className="border rounded px-3 py-2" type="text" placeholder="Address" required />
            </div>
          
          
            <div >
              <p className="mb-0 ">About Doctor</p>
              <textarea onChange={(e)=>setDocAbout(e.target.value)} value={docAbout} placeholder="About Doctor" rows={5} cols={30} required className="border rounded px-3 py-2" />
            </div>
         
          <button className="px-10 py-3 mt-4 bg-blue-200 rounded-full">Add Doctor</button>
          </div>
        </div>
      </div>
    </form>
  );
};

export default Adddoctor;
