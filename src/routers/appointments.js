import express from "express";
import Appointments from "../models/appointments.js";
const router = express.Router();
router.use((req, res, next) => {
  next();
});
router.get("/", async (req, res) => {
  try {
    const appointmentss = await Appointments.find();
    res.status(200).json(appointmentss);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
export default router;
