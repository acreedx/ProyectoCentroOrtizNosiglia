import express from "express";
import Encounter from "../models/encounter.js";
const router = express.Router();
router.use((req, res, next) => {
  next();
});
router.get("/", async (req, res) => {
  try {
    const encounters = await Encounter.find();
    res.status(200).json(encounters);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
export default router;
