import mongoose from "mongoose";
const { Schema } = mongoose;

const appointmentSchema = new Schema({
  resourceType: { type: String, required: true },
  status: { type: String, required: true },
  cancellationReason: {
    coding: [
      {
        system: { type: String, required: true },
        code: { type: String, required: true },
        display: { type: String, required: true },
      },
    ],
  },
  specialty: {
    coding: [
      {
        system: { type: String, required: true },
        code: { type: String, required: true },
        display: { type: String, required: true },
      },
    ],
  },
  reason: [
    {
      coding: [
        {
          system: { type: String, required: true },
          code: { type: String, required: true },
          display: { type: String, required: true },
        },
      ],
    },
  ],
  description: { type: String },
  previousAppointment: {
    reference: { type: String },
  },
  originatingAppointment: {
    reference: { type: String },
  },
  start: { type: String, required: true },
  end: { type: String, required: true },
  account: {
    reference: { type: String },
  },
  created: { type: String, required: true },
  cancellationDate: { type: String },
  note: [{ type: String }],
  patientInstruction: { type: String },
  subject: {
    reference: { type: String },
  },
});

const Appointment = mongoose.model("Appointment", appointmentSchema);

export default Appointment;
