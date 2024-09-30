import express from "express";
import Composition from "../models/composition.js";
const router = express.Router();
router.use((req, res, next) => {
  next();
});
router.get("/", async (req, res) => {
  try {
    const compositions = await Composition.find();
    res.status(200).json(compositions);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
export default router;
