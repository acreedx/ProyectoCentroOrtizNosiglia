import mongoose from "mongoose";
const { Schema } = mongoose;

const participantSchema = new Schema({
  actor: {
    reference: { type: String, required: true },
    display: { type: String },
  },
  status: {
    type: String,
    enum: ["accepted", "declined", "tentative", "needs-action"],
    required: true,
  },
});

const appointmentSchema = new Schema({
  resourceType: {
    type: String,
    default: "Appointment",
    required: true,
  },
  status: {
    type: String,
    enum: [
      "proposed",
      "pending",
      "booked",
      "arrived",
      "fulfilled",
      "cancelled",
      "noshow",
    ],
    required: true,
  },
  description: { type: String },
  start: { type: Date, required: true },
  end: { type: Date },
  participant: [participantSchema],
  created: { type: Date, default: Date.now },
  reasonCode: { type: String },
  serviceType: { type: String },
});

const Appointment = mongoose.model("Appointment", appointmentSchema);

export default Appointment;
