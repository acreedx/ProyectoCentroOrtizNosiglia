import mongoose from "mongoose";
const { Schema } = mongoose;

const practitionerSchema = new Schema({
  resourceType: { type: String, required: true },
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
});

const Practitioner = mongoose.model("Practitioner", practitionerSchema);

module.exports = Practitioner;
