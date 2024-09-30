import express from "express";
import Odontograma from "../models/odontograma.js";
import { ObjectId } from "mongodb";
const router = express.Router();
const timeLog = (req, res, next) => {
  next();
};
router.use(timeLog);
router.get("/", async (req, res) => {
  try {
    const odontogramas = await Odontograma.find();
    res.status(200).json(odontogramas);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
router.get("/:id", async (req, res) => {
  const { id } = req.params;
  if (!id) {
    return res.status(400).json({ message: "Petición mal formada" });
  }
  console.log(id);
  try {
    const odontograma = await Odontograma.findOne({
      patientId: new ObjectId(id),
    });
    if (!odontograma) {
      return res.status(404).json({ message: "Paciente no encontrado" });
    }
    res.status(200).json(odontograma);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
router.put("/:id", async (req, res) => {
  const { id } = req.params;
  if (!id) {
    return res.status(400).json({ message: "Petición mal formada" });
  }
  const updatedData = req.body;
  console.log(updatedData);
  try {
    const updatedOdontogram = await Odontograma.findOneAndUpdate(
      { patientId: id },
      { odontogramRows: updatedData.odontogramRows },
      {
        runValidators: true,
      },
      { new: true }
    );
    if (!updatedOdontogram) {
      return res.status(404).json({ message: "Paciente no encontrado" });
    }
    res.status(200).json(updatedOdontogram);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
router.options("/:id", async (req, res) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, PATCH, DELETE");
  res.header("Access-Control-Allow-Headers", "Content-Type");
  res.send(200);
});
export default router;
