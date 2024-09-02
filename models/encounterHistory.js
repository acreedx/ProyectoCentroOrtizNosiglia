import mongoose from "mongoose";
const { Schema } = mongoose;

const encounterHistorySchema = new Schema({});

const EncounterHistory = mongoose.model(
  "EncounterHistory",
  encounterHistorySchema
);

module.exports = EncounterHistory;
