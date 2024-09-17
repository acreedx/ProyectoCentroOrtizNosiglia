import mongoose from "mongoose";
const { Schema } = mongoose;

const procedureSchema = new Schema({});

const Procedure = mongoose.model("Procedure", procedureSchema);

module.exports = Procedure;
