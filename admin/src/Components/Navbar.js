import React, { useContext } from 'react'
import {useNavigate} from 'react-router-dom'
import logo from '../Assets/Logo.png'
import './Navbar.css'
import { Admincontext } from '../Context/Admincontext'
import { Doctorcontext } from '../Context/Doctorcontext'
const Navbar = () => {
  const {aToken,setAToken}=useContext(Admincontext)
  const {dToken,setDToken}=useContext(Doctorcontext)
const navigate= useNavigate()
  const Logout=()=>{
    navigate('/')
    aToken && setAToken('')
    aToken && localStorage.removeItem('aToken')
    dToken && setDToken('')
    dToken && localStorage.removeItem('dToken')
  }
  return (
    <div>
      <div>
      <nav className="navbar navbar-expand-lg navbar-light #fff sticky-top absolute top-0 z-50">
  <div className="container-fluid">
    <a className="navbar-brand" href="#"><img src={logo}></img></a>
 
  </div>
  <p className='panel_name' >{aToken?'Admin':'Doctor'}</p>
  <button onClick={Logout}className='logout_btn' variant="primary">Logout</button>
</nav>

    </div>
    
    </div>
  )
}

export default Navbar
