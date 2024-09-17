import express from "express";
import Appointment from "../models/appointment.js";
const router = express.Router();
router.use((req, res, next) => {
  next();
});
//Listar
router.get("/", async (req, res) => {
  try {
    const citas = await Appointment.find();
    res.status(200).json(citas);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
router.get("/confirmadas", async (req, res) => {
  try {
    const citas = await Appointment.find();
    res.status(200).json(citas);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
router.get("/canceladas", async (req, res) => {
  try {
    const citas = await Appointment.find();
    res.status(200).json(citas);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
//Crear
router.post("/", async (req, res) => {
  try {
    const nuevaCita = new Appointment(req.body);
    const citaGuardada = await nuevaCita.save();
    res.status(200).json(citaGuardada);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
//Actualizar
router.put("/", async (req, res) => {
  try {
    const citas = await Appointment.find();
    res.status(200).json(citas);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
//Deshabilitar
router.put("/deshabilitar", async (req, res) => {
  try {
    const citas = await Appointment.find();
    res.status(200).json(citas);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
//Habilitar
router.put("/habilitar", async (req, res) => {
  try {
    const citas = await Appointment.find();
    res.status(200).json(citas);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.put("/confirmar", async (req, res) => {
  try {
    const citas = await Appointment.find();
    res.status(200).json(citas);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.put("/cancelar", async (req, res) => {
  try {
    const citas = await Appointment.find();
    res.status(200).json(citas);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;
