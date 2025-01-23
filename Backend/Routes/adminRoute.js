import express from 'express'
import { addDoctor,allDoctors,Loginadmin,appointmentsAdmin, cancelappointmentAdmin,adminDashboard } from '../Controllers/Admincontroller.js'
import upload from '../Middleware/Multer.js'
import authAdmin from '../Middleware/Authadmin.js'
import { changeAvailability } from '../Controllers/Doctorcontroller.js'

const adminRouter=express.Router()

adminRouter.post('/add-doctor',authAdmin,upload.single('image'),addDoctor)
adminRouter.post('/Login',Loginadmin)
adminRouter.post('/all-doctors',authAdmin,allDoctors)
adminRouter.post('/change-availability',authAdmin,changeAvailability)
adminRouter.get('/appointments',authAdmin,appointmentsAdmin)
adminRouter.post('/cancel-appointment',authAdmin,cancelappointmentAdmin)
adminRouter.get('/dashboard',authAdmin,adminDashboard)
export default adminRouter