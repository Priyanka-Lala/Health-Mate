import React, { useContext } from 'react'
import { Admincontext } from '../Context/Admincontext'
import { NavLink } from 'react-router'
import { Assets } from '../Assets/Asstes'
import './Sidebar.css';
import { Doctorcontext } from '../Context/Doctorcontext';
const Sidebar = () => {
  const {aToken}=useContext(Admincontext)
  const{dToken}=useContext(Doctorcontext)
  return (
    <div className='sidebar_body'>
     {
      aToken && <ul>
        <NavLink className={({isActive})=>`contain ${isActive ? 'activelink' : ''}`} to={'/AdminDashboard'}>
          <img src={Assets.dashboard} alt='' className='nav-icon'/>
          <p className='navlink'>Dashboard</p>
        </NavLink>
      <NavLink className={({isActive})=>`contain ${isActive ? 'activelink' : ''}`} to={'/All-Apointments'}>
          <img src={Assets.clock} alt='' className='nav-icon'/>
          <p className='navlink'>Appointments</p>
        </NavLink>
        <NavLink className={({isActive})=>`contain ${isActive ? 'activelink' : ''}`} to={'/Add-Doctors'} >
          <img src={Assets.medicialdoctor} alt='' className='nav-icon'/>
          <p className='navlink'>Add-Doctors</p>
        </NavLink>
        <NavLink className={({isActive})=>`contain ${isActive ? 'activelink' : ''}`} to={'/Doctor-List'} >
          <img src={Assets.reports} alt='' className='nav-icon'/>
          <p className='navlink'>Doctor-List</p>
        </NavLink>
      </ul> 
     }
     {/* Doctor panel */}
     {
      dToken && <ul>
        <NavLink className={({isActive})=>`contain ${isActive ? 'activelink' : ''}`} to={'/Doctor-Dashboard'}>
          <img src={Assets.dashboard} alt='' className='nav-icon'/>
          <p className='navlink hidden md:block'>Dashboard</p>
        </NavLink>
      <NavLink className={({isActive})=>`contain ${isActive ? 'activelink' : ''}`} to={'/Doctor-Appointment'}>
          <img src={Assets.clock} alt='' className='nav-icon'/>
          <p className='navlink hidden md:block'>Appointments</p>
        </NavLink>
        
        <NavLink className={({isActive})=>`contain ${isActive ? 'activelink' : ''}`} to={'/Doctor-profile'} >
          <img src={Assets.reports} alt='' className='nav-icon'/>
          <p className='navlink hidden md:block '>Profile</p>
        </NavLink>
      </ul> 
     }
    </div>
  )
}

export default Sidebar
