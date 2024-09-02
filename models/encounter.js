import mongoose from "mongoose";
const { Schema } = mongoose;

const encounterSchema = new Schema({});

const Encounter = mongoose.model("Encounter", encounterSchema);

module.exports = Encounter;
