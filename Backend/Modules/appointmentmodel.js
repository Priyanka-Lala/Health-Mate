import mongoose from 'mongoose';


const appointmentSchema= new mongoose.Schema({
    userid:{type:String ,require:true},
    docId:{type:String ,require:true},
    slotDate:{type:String,require:true},
    slotTime:{type:String,require:true},
    userData:{type:Object,require:true},
   docData:{type:Object,require:true},
   amount:{type:Number,require:true},
   date:{type:Number,require:true},
   cancelled:{type:Boolean,default:false},
   payment:{type:Boolean,default:false},
   iscomplete:{type:Boolean,default:false}
})

const AppointmentModel=mongoose.models.appointment || mongoose.model('appointment',appointmentSchema)

export default AppointmentModel
