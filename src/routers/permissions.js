import express from "express";
import Permission from "../models/permissions.js";
const router = express.Router();
router.use((req, res, next) => {
  next();
});
router.get("/", async (req, res) => {
  try {
    const roles = await Permission.find();
    res.status(200).json(roles);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.post("/", async (req, res) => {
  try {
    const newPermission = new Permission(req.body);
    const savedUser = await newPermission.save();
    res.status(200).json(savedUser);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.put("/", async (req, res) => {
  try {
    const data = req.body;
    const updatedPermission = await Permission.findOneAndUpdate(
      { _id: req.body._id },
      data,
      {
        runValidators: true,
      },
      { new: true }
    );
    res.status(200).json(updatedPermission);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
export default router;
