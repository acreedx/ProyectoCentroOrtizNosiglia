import mongoose from "mongoose";
const { Schema } = mongoose;

const practitionerSchema = new Schema({});

const Practitioner = mongoose.model("Practitioner", practitionerSchema);

module.exports = Practitioner;
