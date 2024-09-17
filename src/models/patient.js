import mongoose from "mongoose";
const { Schema } = mongoose;

const patientSchema = new Schema({});

const Patient = mongoose.model("Patient", patientSchema);

module.exports = Patient;
