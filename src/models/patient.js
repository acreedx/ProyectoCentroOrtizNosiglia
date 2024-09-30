import mongoose from "mongoose";
const { Schema } = mongoose;

const patientSchema = new Schema(
  {
    resourceType: { type: String, default: "Patient" },
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
  },
  {
    timestamps: true,
  }
);

const Patient = mongoose.model("Patient", patientSchema);

export default Patient;
