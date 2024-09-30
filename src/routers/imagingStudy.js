import express from "express";
import ImagingStudy from "../models/imagingStudy.js";
const router = express.Router();
router.use((req, res, next) => {
  next();
});
router.get("/", async (req, res) => {
  try {
    const imagingStudies = await ImagingStudy.find();
    res.status(200).json(imagingStudies);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
export default router;
