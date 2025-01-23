import mongoose from "mongoose";

const DoctorSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    specialization: {
      type: String,
      required: true,
    },
    degree: {
      type: String,
      required: true,
    },
    experience: {
      type: String,
      required: true,
    },
    available: {
      type: Boolean,
      default: true,
    },
    about:{
        type: String,
        required: true,
    },
    fee: {
      type: Number,
      required: true,
    },
    address: {
      type: Object,
      required: true,
    },
    date: {
      type: Number,
      required: true,
    },
    slot_booked: {
      type: Object,
      default: {},
    },
  },
  { minimize: false }
);

const doctormodule =
  mongoose.models.Doctors || mongoose.model("Doctors", DoctorSchema);

export default doctormodule;
