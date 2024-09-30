import express from "express";
import AuditEvent from "../models/auditEvent.js";
const router = express.Router();
router.use((req, res, next) => {
  next();
});
router.get("/", async (req, res) => {
  try {
    const auditEvents = await AuditEvent.find();
    res.status(200).json(auditEvents);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
export default router;
