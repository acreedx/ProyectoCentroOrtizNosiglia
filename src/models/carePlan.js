import mongoose from "mongoose";
const { Schema } = mongoose;

const carePlanSchema = new Schema({
  resourceType: { type: String, required: true },
  status: { type: String, required: true },
  category: {
    coding: [
      {
        system: { type: String, required: true },
        code: { type: String, required: true },
        display: { type: String, required: true },
      },
    ],
  },
  title: { type: String, required: true },
  description: { type: String },
  subject: {
    reference: { type: String, required: true },
    display: { type: String },
  },
  created: { type: String, required: true },
  custodian: {
    reference: { type: String, required: true },
    display: { type: String },
  },
  activity: [
    {
      performedActivity: [
        {
          reference: { type: String },
        },
      ],
      plannedActivityReference: {
        reference: { type: String },
        display: { type: String },
      },
    },
  ],
});

const CarePlan = mongoose.model("CarePlan", carePlanSchema);

module.exports = CarePlan;
