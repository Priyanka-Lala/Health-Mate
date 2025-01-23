
import { useContext } from 'react';
import './App.css';
import Login from './pages/Login';
import { ToastContainer, toast } from 'react-toastify';
import { Appcontext } from './Context/Appcontext';
import { Admincontext } from './Context/Admincontext';
import Navbar from './Components/Navbar';
import Sidebar from './Components/Sidebar';
import { Route, Routes } from 'react-router-dom';
import Dashboard from './pages/Admin/Dashboard';
import AddDoctors from './pages/Admin/Adddoctor';
import Doctorlist from './pages/Admin/Doctorlist';
import AllAppointments from './pages/Admin/AllApointments'
import { Doctorcontext } from './Context/Doctorcontext';
import Doctordashboard from './pages/Doctor/Doctordashboard';
import Doctorappointment from './pages/Doctor/Doctorappointment';
import Doctorprofile from './pages/Doctor/Doctorprofile';
function App() {
  const {aToken}=useContext(Admincontext)
const {dToken}=useContext(Doctorcontext)


  return aToken ||dToken ?(
    <div className="App">
      
      <ToastContainer/>
      <Navbar/>
      <div className='sidebar'>
        <Sidebar/>
        <Routes>
          {/* Admin Route */}
          <Route path='/' element={<></>} />
          <Route path='/AdminDashboard' element={<Dashboard/>} />
          <Route path='/All-Apointments' element={<AllAppointments/>}/>
          <Route path='/Add-Doctors' element={<AddDoctors/>}/>
          <Route path='/Doctor-List' element={<Doctorlist/>}/>

          {/* Doctor Route */}
          <Route path='/Doctor-Dashboard' element={<Doctordashboard/>}/>
          <Route path='/Doctor-Appointment' element={<Doctorappointment/>}/>
          <Route path='/Doctor-profile' element={<Doctorprofile/>}/>
        </Routes>
      </div>
    </div>
  ):(
<>
<Login/>
<ToastContainer/>

</>
  );
}

export default App;
