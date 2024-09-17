import mongoose from "mongoose";
const { Schema } = mongoose;

const imagingStudySchema = new Schema({});

const ImagingStudy = mongoose.model("ImagingStudy", imagingStudySchema);

module.exports = ImagingStudy;
