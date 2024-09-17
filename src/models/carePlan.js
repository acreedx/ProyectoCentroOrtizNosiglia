import mongoose from "mongoose";
const { Schema } = mongoose;

const carePlanSchema = new Schema({});

const CarePlan = mongoose.model("CarePlan", carePlanSchema);

module.exports = CarePlan;
