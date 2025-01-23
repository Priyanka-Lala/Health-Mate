import express from 'express';
import { doctorlist,loginDoctor,appointmentDoctor
    ,appointmentCompelete,appointmentCancel ,doctorDashbaord,updateprofile,doctorprofile} from '../Controllers/Doctorcontroller.js';
import authDoctor from '../Middleware/Authdoctor.js';

const doctorRouter=express.Router()

doctorRouter.get('/list',doctorlist)
doctorRouter.post('/login',loginDoctor)
doctorRouter.get('/appointments',authDoctor,appointmentDoctor)
doctorRouter.post('/complete-appointment',authDoctor,appointmentCompelete)
doctorRouter.post('/cancel-appointment',authDoctor,appointmentCancel)
doctorRouter.get('/dashboard',authDoctor,doctorDashbaord)
doctorRouter.get('/profile',authDoctor,doctorprofile)
doctorRouter.post('/update-profile',authDoctor,updateprofile)

export default doctorRouter