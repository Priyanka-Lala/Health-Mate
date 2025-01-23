import React, { useContext, useState } from 'react'
import './Login.css'
import axios from 'axios'
import { Admincontext } from '../Context/Admincontext'
import { toast } from 'react-toastify'
import { Doctorcontext } from '../Context/Doctorcontext'
const Login = () => {
const [state,setState]=useState('Admin')
const[email,setEmail]=useState()

const[password,setPassword]=useState()
const {setAToken,backendurl}=useContext(Admincontext)
const {setDToken}=useContext(Doctorcontext)
const OnsubmitHandler=async(event)=>{
event.preventDefault()
 try {
  // console.log('Backend URL:', backendurl); 
  if (state==='Admin') {
    const {data}=await axios.post(`${backendurl}/api/admin/Login`,{email,password})
   

    if (data.success) {
      localStorage.setItem('aToken',data.token)
   setAToken(data.token);
   
    }else{
      toast.error(data.message)
    }
  }
  else{
 const {data} =await axios.post(backendurl+'/api/doctor/login',{email,password})
 if (data.success) {
  localStorage.setItem('dToken',data.token)
setDToken(data.token);
console.log(data.token);


}else{
  toast.error(data.message)
}

  }
 } catch (error) {
  
 }
}
  return (
    <form className='form_tag 'onSubmit={OnsubmitHandler}>
      <div className='form_container shadow-lg'>
        <p className='form-contain'><span>{state}</span> Login</p>
        <div className='form_lable'>
            <p>Email:</p>
            <input onChange={(e)=>setEmail(e.target.value)} value={email} className="input_tag" type="email" required></input>
        </div>
        <div className='form_lable'>
            <p>Password:</p>
            <input onChange={(e)=>setPassword(e.target.value)} value={password}className="input_tag" type="password" required></input>
        </div>
        <button className='admin_login '>Login</button>
        {
          state ==='Admin'? <p style={{marginLeft:"60px"}}>Doctor Login?<span onClick={()=>setState('Doctor')} className='form_login'> Click here.</span></p>
          :<p style={{marginLeft:"60px"}} >AdminLogin?<span onClick={()=>setState('Admin')} className='form_login'> Click here.</span></p>
        }
      </div>
    </form>
  )
}

export default Login
