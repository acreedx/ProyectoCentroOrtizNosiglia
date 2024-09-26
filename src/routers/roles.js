import express from "express";
import Rol from "../models/roles.js";
const router = express.Router();
router.use((req, res, next) => {
  next();
});
router.get("/", async (req, res) => {
  res.header("Access-Control-Allow-Origin", "*");
  try {
    const roles = await Rol.find();
    res.status(200).json(roles);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
export default router;
