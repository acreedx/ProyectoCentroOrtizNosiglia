import express from "express";
import Practitioner from "../models/practitioner.js";
const router = express.Router();
router.use((req, res, next) => {
  next();
});
router.get("/", async (req, res) => {
  try {
    const practitioners = await Practitioner.find();
    res.status(200).json(practitioners);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
export default router;
