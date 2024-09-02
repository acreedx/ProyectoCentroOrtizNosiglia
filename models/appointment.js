import mongoose from "mongoose";
const { Schema } = mongoose;

const appointmentSchema = new Schema({});

const Appointment = mongoose.model("Persona", appointmentSchema);

module.exports = Appointment;
