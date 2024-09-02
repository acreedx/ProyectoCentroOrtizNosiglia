import express from "express";
import Person from "../models/person.js";
import { ObjectId } from "mongodb";
import Odontograma from "../models/odontograma.js";
const router = express.Router();
const timeLog = (req, res, next) => {
  next();
};
router.use(timeLog);
router.get("/", async (req, res) => {
  res.header("Access-Control-Allow-Origin", "*");
  try {
    const personas = await Person.find();
    res.status(200).json(personas);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
router.put("/:id", async (req, res) => {
  res.header("Access-Control-Allow-Origin", "*");
  const { id } = req.params;
  if (!id) {
    return res.status(400).json({ message: "Petición mal formada" });
  }
  const updatedData = req.body;
  try {
    const updatedPerson = await Person.findOneAndUpdate(
      { _id: id },
      updatedData,
      {
        runValidators: true,
      }
    );
    if (!updatedPerson) {
      return res.status(404).json({ message: "Paciente no encontrado" });
    }
    console.log(updatedPerson);
    res.status(200).json(updatedPerson);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
router.get("/restorepatient/:id", async (req, res) => {
  res.header("Access-Control-Allow-Origin", "*");
  const { id } = req.params;
  if (!id) {
    return res.status(400).json({ message: "Petición mal formada" });
  }
  try {
    const updatedPerson = await Person.findOneAndUpdate(
      { _id: id },
      { estado: true },
      { new: true }
    );
    if (!updatedPerson) {
      return res.status(404).json({ message: "Paciente no encontrado" });
    }
    console.log(updatedPerson);
    res.status(200).json(updatedPerson);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
router.get("/deletepatient/:id", async (req, res) => {
  res.header("Access-Control-Allow-Origin", "*");
  const { id } = req.params;
  if (!id) {
    return res.status(400).json({ message: "Petición mal formada" });
  }
  try {
    const updatedPerson = await Person.findOneAndUpdate(
      { _id: id },
      { estado: false },
      { new: true }
    );
    if (!updatedPerson) {
      return res.status(404).json({ message: "Paciente no encontrado" });
    }
    console.log(updatedPerson);
    res.status(200).json(updatedPerson);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
router.post("/", async (req, res) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, PATCH, DELETE");
  res.header(
    "Access-Control-Allow-Headers",
    "Content-Type, Access-Control-Request-Headers"
  );

  try {
    const nuevaPersona = new Person(req.body);
    const personaGuardada = await nuevaPersona.save();
    const odontogramaPersona = new Odontograma({
      patientId: personaGuardada._id,
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
    res.status(200).json(personaGuardada);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
router.get("/:id", async (req, res) => {
  res.header("Access-Control-Allow-Origin", "*");
  const { id } = req.params;
  if (!id) {
    return res.status(400).json({ message: "Petición mal formada" });
  }
  try {
    const person = await Person.findOne({ _id: id });
    if (!person) {
      return res.status(404).json({ message: "Paciente no encontrada" });
    }
    res.status(200).json(person);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
router.options("/:id", async (req, res) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, PATCH, DELETE");
  res.header(
    "Access-Control-Allow-Headers",
    "Content-Type, Access-Control-Request-Headers"
  );
  res.send(200);
});
export default router;
