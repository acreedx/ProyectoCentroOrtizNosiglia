import express from "express";
import Permission from "../models/permissions.js";
const router = express.Router();

// Middleware para permitir CORS
router.use((req, res, next) => {
  next();
});

// Obtener todos los permisos
router.get("/", async (req, res) => {
  try {
    const permissions = await Permission.find();
    res.status(200).json(permissions);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Obtener todos los permisos activos
router.get("/active", async (req, res) => {
  try {
    const permissions = await Permission.find({ active: true });
    res.status(200).json(permissions);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get("/inactive", async (req, res) => {
  try {
    const permissions = await Permission.find({ active: false });
    res.status(200).json(permissions);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Obtener un permiso por ID
router.get("/:id", async (req, res) => {
  try {
    const permission = await Permission.findById(req.params.id);
    if (!permission) {
      return res.status(404).json({ message: "Permiso no encontrado" });
    }
    res.status(200).json(permission);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Crear un nuevo permiso
router.post("/", async (req, res) => {
  const { permissionName, code, active } = req.body;

  const newPermission = new Permission({
    permissionName,
    code,
    active,
  });

  try {
    const savedPermission = await newPermission.save();
    res.status(201).json(savedPermission);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

//Crear multiples permisos
router.post("/bulk", async (req, res) => {
  const permissionsArray = req.body;

  // Validación básica
  if (!Array.isArray(permissionsArray) || permissionsArray.length === 0) {
    return res
      .status(400)
      .json({ message: "Se requiere un array de permisos." });
  }

  try {
    const newPermissions = await Permission.insertMany(permissionsArray);
    res.status(201).json(newPermissions);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
// Actualizar un permiso por ID
router.put("/:id", async (req, res) => {
  const { permissionName, code, active } = req.body;

  try {
    const updatedPermission = await Permission.findByIdAndUpdate(
      req.params.id,
      { permissionName, code, active },
      { new: true }
    );

    if (!updatedPermission) {
      return res.status(404).json({ message: "Permiso no encontrado" });
    }

    res.status(200).json(updatedPermission);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Eliminar un permiso por ID
router.patch("/habilitar/:id", async (req, res) => {
  try {
    const updatedPermission = await Permission.findByIdAndUpdate(
      req.params.id,
      { active: true },
      { new: true }
    );

    if (!updatedPermission) {
      return res.status(404).json({ message: "Permiso no encontrado" });
    }

    res
      .status(200)
      .json({ message: "Permiso habilitado con éxito", updatedPermission });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Deshabilitar un permiso
router.patch("/deshabilitar/:id", async (req, res) => {
  try {
    const updatedPermission = await Permission.findByIdAndUpdate(
      req.params.id,
      { active: false },
      { new: true }
    );

    if (!updatedPermission) {
      return res.status(404).json({ message: "Permiso no encontrado" });
    }

    res
      .status(200)
      .json({ message: "Permiso deshabilitado con éxito", updatedPermission });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;
