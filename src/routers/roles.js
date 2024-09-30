import express from "express";
import Rol from "../models/roles.js";
const router = express.Router();
router.use((req, res, next) => {
  next();
});

// Obtener todos los roles
router.get("/", async (req, res) => {
  try {
    const roles = await Rol.find().populate("permissions");
    res.status(200).json(roles);
  } catch (error) {
    console.error(error); // Para registro en el servidor
    res.status(500).json({ message: "Error del servidor" });
  }
});

// Obtener un rol por ID
router.get("/:id", async (req, res) => {
  try {
    const role = await Rol.findById(req.params.id).populate("permissions");
    if (!role) {
      return res.status(404).json({ message: "Rol no encontrado" });
    }
    res.status(200).json(role);
  } catch (error) {
    console.error(error); // Para registro en el servidor
    res.status(500).json({ message: "Error del servidor" });
  }
});

// Crear un nuevo rol
router.post("/", async (req, res) => {
  const { roleName, permissions, active } = req.body;

  try {
    // Verificar si ya existe un rol con el mismo nombre
    const existingRole = await Rol.findOne({ roleName });
    if (existingRole) {
      return res.status(400).json({ message: "El rol ya existe" });
    }
    const newRole = new Rol({
      roleName,
      permissions,
      active,
    });

    const savedRole = await newRole.save();
    res.status(201).json(savedRole);
  } catch (error) {
    console.error(error); // Para registro en el servidor
    res.status(500).json({ message: "Error del servidor" });
  }
});

//Crear multiples roles
router.post("/bulk", async (req, res) => {
  const rolesArray = req.body;

  // Validación básica
  if (!Array.isArray(rolesArray) || rolesArray.length === 0) {
    return res.status(400).json({ message: "Se requiere un array de roles." });
  }

  try {
    const newRoles = await Rol.insertMany(rolesArray);
    res.status(201).json(newRoles);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
// Actualizar un rol
router.put("/:id", async (req, res) => {
  const { roleName, permissions, active } = req.body;

  try {
    // Verificar si hay otro rol con el mismo nombre, excluyendo el rol actual
    const existingRole = await Rol.findOne({
      roleName,
      _id: { $ne: req.params.id },
    });
    if (existingRole) {
      return res
        .status(400)
        .json({ message: "Ya existe un rol con ese nombre" });
    }
    const updatedRole = await Rol.findByIdAndUpdate(
      req.params.id,
      { roleName, permissions, active },
      { new: true } // Devuelve el documento actualizado
    );

    if (!updatedRole) {
      return res.status(404).json({ message: "Rol no encontrado" });
    }

    res.status(200).json(updatedRole);
  } catch (error) {
    console.error(error); // Para registro en el servidor
    res.status(500).json({ message: "Error del servidor" });
  }
});

// Habilitar un rol
router.put("/habilitar/:id", async (req, res) => {
  try {
    const updatedRole = await Rol.findByIdAndUpdate(
      req.params.id,
      { active: true }, // Cambia el estado a true
      { new: true } // Devuelve el documento actualizado
    );

    if (!updatedRole) {
      return res.status(404).json({ message: "Rol no encontrado" });
    }

    res.status(200).json({ message: "Rol habilitado con éxito", updatedRole });
  } catch (error) {
    console.error(error); // Para registro en el servidor
    res.status(500).json({ message: "Error del servidor" });
  }
});

// Deshabilitar un rol
router.put("/deshabilitar/:id", async (req, res) => {
  try {
    const updatedRole = await Rol.findByIdAndUpdate(
      req.params.id,
      { active: false },
      { new: true }
    );
    if (!updatedRole) {
      return res.status(404).json({ message: "Rol no encontrado" });
    }
    res
      .status(200)
      .json({ message: "Rol deshabilitado con éxito", updatedRole });
  } catch (error) {
    console.error(error); // Para registro en el servidor
    res.status(500).json({ message: "Error del servidor" });
  }
});

export default router;
