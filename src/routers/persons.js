import express from "express";
import Odontograma from "../models/odontograma.js";
import { PersonsRepository } from "../repositories/personsRepository.js";
import Persons from "../models/Persons.js";
const router = express.Router();
const timeLog = (req, res, next) => {
  next();
};
router.use(timeLog);

router.get("/", async (req, res) => {
  try {
    const personas = await Persons.find().populate("systemUser.roles");
    res.status(200).json(personas);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
router.post("/", async (req, res) => {
  try {
    console.log(req.body);
    const nuevaPersona = await PersonsRepository.create(req.body);
    const odontogramaPersona = new Odontograma({
      patientId: nuevaPersona._id,
      odontogramRows: [
        {
          msc: "ICSI",
          temp: "61",
          piezas: "21",
          fecha: "",
          diagnostico: "",
          tratamiento: "",
        },
        {
          msc: "ILSI",
          temp: "62",
          piezas: "22",
          fecha: "",
          diagnostico: "",
          tratamiento: "",
        },
        {
          msc: "CSI",
          temp: "63",
          piezas: "23",
          fecha: "",
          diagnostico: "",
          tratamiento: "",
        },
        {
          msc: "1PMSI",
          temp: "64",
          piezas: "24",
          fecha: "",
          diagnostico: "",
          tratamiento: "",
        },
        {
          msc: "2PMSI",
          temp: "65",
          piezas: "25",
          fecha: "",
          diagnostico: "",
          tratamiento: "",
        },
        {
          msc: "1MSI",
          temp: "",
          piezas: "26",
          fecha: "",
          diagnostico: "",
          tratamiento: "",
        },
        {
          msc: "2MSI",
          temp: "",
          piezas: "27",
          fecha: "",
          diagnostico: "",
          tratamiento: "",
        },
        {
          msc: "3MSI",
          temp: "",
          piezas: "28",
          fecha: "",
          diagnostico: "",
          tratamiento: "",
        },
        {
          msc: "3MII",
          temp: "",
          piezas: "38",
          fecha: "",
          diagnostico: "",
          tratamiento: "",
        },
        {
          msc: "2MII",
          temp: "",
          piezas: "37",
          fecha: "",
          diagnostico: "",
          tratamiento: "",
        },
        {
          msc: "1MII",
          temp: "",
          piezas: "36",
          fecha: "",
          diagnostico: "",
          tratamiento: "",
        },
        {
          msc: "2PMII",
          temp: "75",
          piezas: "35",
          fecha: "",
          diagnostico: "",
          tratamiento: "",
        },
        {
          msc: "1PMII",
          temp: "74",
          piezas: "34",
          fecha: "",
          diagnostico: "",
          tratamiento: "",
        },
        {
          msc: "CII",
          temp: "73",
          piezas: "33",
          fecha: "",
          diagnostico: "",
          tratamiento: "",
        },
        {
          msc: "ILII",
          temp: "72",
          piezas: "32",
          fecha: "",
          diagnostico: "",
          tratamiento: "",
        },
        {
          msc: "ICII",
          temp: "71",
          piezas: "31",
          fecha: "",
          diagnostico: "",
          tratamiento: "",
        },
        {
          msc: "ICSD",
          temp: "51",
          piezas: "11",
          fecha: "",
          diagnostico: "",
          tratamiento: "",
        },
        {
          msc: "ILSD",
          temp: "52",
          piezas: "12",
          fecha: "",
          diagnostico: "",
          tratamiento: "",
        },
        {
          msc: "CSD",
          temp: "53",
          piezas: "13",
          fecha: "",
          diagnostico: "",
          tratamiento: "",
        },
        {
          msc: "1PMSD",
          temp: "54",
          piezas: "14",
          fecha: "",
          diagnostico: "",
          tratamiento: "",
        },
        {
          msc: "2PMSD",
          temp: "55",
          piezas: "15",
          fecha: "",
          diagnostico: "",
          tratamiento: "",
        },
        {
          msc: "1MSD",
          temp: "",
          piezas: "16",
          fecha: "",
          diagnostico: "",
          tratamiento: "",
        },
        {
          msc: "2MSD",
          temp: "",
          piezas: "17",
          fecha: "",
          diagnostico: "",
          tratamiento: "",
        },
        {
          msc: "3MSD",
          temp: "",
          piezas: "18",
          fecha: "",
          diagnostico: "",
          tratamiento: "",
        },
        {
          msc: "3MID",
          temp: "",
          piezas: "48",
          fecha: "",
          diagnostico: "",
          tratamiento: "",
        },
        {
          msc: "2MID",
          temp: "",
          piezas: "47",
          fecha: "",
          diagnostico: "",
          tratamiento: "",
        },
        {
          msc: "1MID",
          temp: "",
          piezas: "46",
          fecha: "",
          diagnostico: "",
          tratamiento: "",
        },
        {
          msc: "2PMID",
          temp: "85",
          piezas: "45",
          fecha: "",
          diagnostico: "",
          tratamiento: "",
        },
        {
          msc: "1PMID",
          temp: "84",
          piezas: "44",
          fecha: "",
          diagnostico: "",
          tratamiento: "",
        },
        {
          msc: "CID",
          temp: "83",
          piezas: "43",
          fecha: "",
          diagnostico: "",
          tratamiento: "",
        },
        {
          msc: "ILID",
          temp: "82",
          piezas: "42",
          fecha: "",
          diagnostico: "",
          tratamiento: "",
        },
        {
          msc: "ICID",
          temp: "81",
          piezas: "41",
          fecha: "",
          diagnostico: "",
          tratamiento: "",
        },
      ],
    });
    await odontogramaPersona.save();
    res.status(200).json(nuevaPersona);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
export default router;
