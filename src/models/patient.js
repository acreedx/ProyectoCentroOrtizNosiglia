import mongoose from "mongoose";
const { Schema } = mongoose;

const patientSchema = new Schema({
  resourceType: { type: String, required: true },
  contact: {
    relationship: { type: String, required: true },
    name: { type: String, required: true },
    telecom: {
      system: { type: String, required: true },
      value: { type: String, required: true },
      use: { type: String },
    },
    address: {
      use: { type: String },
      line: [{ type: String }],
      city: { type: String, required: true },
      state: { type: String },
      postalCode: { type: String },
    },
    gender: { type: String },
  },
  link: {
    other: {
      reference: { type: String, required: true },
      display: { type: String },
    },
  },
  organization: {
    reference: { type: String, required: true },
    display: { type: String },
  },
});

const Patient = mongoose.model("Patient", patientSchema);

module.exports = Patient;
