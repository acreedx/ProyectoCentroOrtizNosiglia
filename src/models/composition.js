import mongoose from "mongoose";
const { Schema } = mongoose;

const compositionSchema = new Schema(
  {
    resourceType: { type: String, default: "Composition" },
    subject: {
      reference: { type: String, required: true },
    },
    encounter: [
      {
        reference: { type: String },
      },
    ],
    date: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

const Composition = mongoose.model("Composition", compositionSchema);

export default Composition;
