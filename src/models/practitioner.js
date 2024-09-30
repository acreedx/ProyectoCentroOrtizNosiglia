import mongoose from "mongoose";
const { Schema } = mongoose;

const practitionerSchema = new Schema(
  {
    resourceType: { type: String, default: "Practitioner" },
    qualification: {
      code: {
        coding: {
          system: { type: String, required: true },
          code: { type: Number, required: true },
          display: { type: String, required: true },
        },
      },
    },
    issuer: {
      reference: { type: String, required: true },
      display: { type: String },
    },
    person: {
      reference: { type: String, required: true, ref: "Person" },
      display: { type: String },
    },
  },
  {
    timestamps: true,
  }
);

const Practitioner = mongoose.model("Practitioner", practitionerSchema);

export default Practitioner;
