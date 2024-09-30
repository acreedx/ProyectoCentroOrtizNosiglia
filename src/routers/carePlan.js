import express from "express";
import CarePlan from "../models/carePlan.js";
const router = express.Router();
router.use((req, res, next) => {
  next();
});
router.get("/", async (req, res) => {
  try {
    const carePlans = await CarePlan.find();
    res.status(200).json(carePlans);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
export default router;
