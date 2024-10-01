import express from "express";
import { AuditEventRepository } from "../repositories/auditEventRepository.js";
import getUser from "../middlewares/jwtMiddleware.js";
import errorHandler from "../middlewares/errorHandlerMiddleware.js";
const router = express.Router();
router.use(getUser);

// Ruta para obtener todos los eventos de auditoría
router.get("/", async (req, res) => {
  try {
    if (!req.session.user) {
      return res.status(401).json({ message: "No autorizado" });
    }
    const auditEvents = await AuditEventRepository.getAll();
    res.status(200).json(auditEvents);
  } catch (error) {
    errorHandler(res, error);
  }
});

// Ruta para crear un nuevo evento de auditoría
router.post("/", async (req, res) => {
  try {
    if (!req.session.user) {
      return res.status(401).json({ message: "No autorizado" });
    }
    const { _id, nombreUsuario, email, foto } = req.session.user;
    const occurredDateTime = new Date().toISOString();
    const ipAddress =
      req.headers["x-forwarded-for"] || req.connection.remoteAddress;
    const auditEventData = {
      type: req.body.type,
      action: "create",
      severity: "medium",
      occurredDateTime: occurredDateTime,
      outcome: req.body.outcome,
      patient: req.body.patient,
      agent: [
        {
          who: {
            reference: _id,
            display: nombreUsuario,
          },
          requestor: true,
          type: {
            coding: [
              {
                system: "http://hl7.org/fhir/ValueSet/practitioner-role",
                code: "administrador",
                display: "Administrador",
              },
            ],
          },
          network: {
            address: ipAddress,
            type: "Network Address",
          },
        },
      ],
    };
    await logAuditEvent({
      type: "request",
      action: "create", // O ajusta según el método
      user: { _id, nombreUsuario, ipAddress },
      patient: req.body.patient,
      encounter: req.body.encounter,
    });
    const newAuditEvent = await AuditEventRepository.create(auditEventData);
    res.status(201).json(newAuditEvent);
  } catch (error) {
    errorHandler(res, error);
  }
});

// Ruta para obtener un evento de auditoría por ID
router.get("/:id", async (req, res) => {
  try {
    const auditEvent = await AuditEventRepository.getById(req.params.id);
    res.status(200).json(auditEvent);
  } catch (error) {
    errorHandler(res, error);
  }
});

// Ruta para actualizar un evento de auditoría
router.put("/:id", async (req, res) => {
  try {
    const updatedAuditEvent = await AuditEventRepository.update(
      req.params.id,
      req.body
    );
    res.status(200).json(updatedAuditEvent);
  } catch (error) {
    errorHandler(res, error);
  }
});

// Ruta para eliminar un evento de auditoría
router.delete("/:id", async (req, res) => {
  try {
    await AuditEventRepository.delete(req.params.id);
    res.status(204).send(); // No hay contenido para enviar en la respuesta
  } catch (error) {
    errorHandler(res, error);
  }
});

router.use(errorHandler);
export default router;
