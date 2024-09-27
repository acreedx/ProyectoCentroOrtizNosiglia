import mongoose from "mongoose";
const { Schema } = mongoose;

const compositionSchema = new Schema({
  resourceType: { type: String, required: true },
  subject: {
    reference: { type: String, required: true },
  },
  encounter: [
    {
      reference: { type: String },
    },
  ],
  date: { type: String, required: true },
});

const Composition = mongoose.model("Composition", compositionSchema);

module.exports = Composition;
