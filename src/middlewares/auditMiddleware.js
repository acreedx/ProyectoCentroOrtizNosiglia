import AuditEventRepository from "../repositories/auditEventRepository.js"; // Asegúrate de importar tu repositorio
import { errorHandler } from "../middlewares/errorHandler.js"; // Importa tu manejador de errores

const auditMiddleware = async (req, res, next) => {
  const { method, path } = req;
  if (!req.session.user) {
    return next();
  }
  const auditEventData = {
    type: {
      coding: [
        {
          system: "http://terminology.hl7.org/CodeSystem/audit-event-type",
          code: "request",
          display: "API Request",
        },
      ],
    },
    action: method.toLowerCase(), // Usa el método HTTP como acción
    severity: "medium", // Puedes ajustar la severidad según tu lógica
    occurredDateTime: new Date().toISOString(), // Fecha y hora actual
    outcome: {
      code: "0", // Inicialmente se considera exitoso
      description: "Success", // Descripción inicial
    },
    patient: req.body.patient || {}, // Ajusta esto según tu lógica
    agent: [
      {
        who: {
          reference: req.session.user._id,
          display: req.session.user.nombreUsuario,
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
          address:
            req.headers["x-forwarded-for"] || req.connection.remoteAddress,
        },
      },
    ],
  };

  // Crear el evento de auditoría cuando la solicitud finaliza
  const end = res.end.bind(res);
  res.end = async (...args) => {
    try {
      // Si la respuesta es un error, ajusta el outcome
      if (res.statusCode >= 400) {
        auditEventData.outcome.code = "4"; // Código de fallo menor (por ejemplo)
        auditEventData.outcome.description = "Minor failure";
      }

      // Registrar el evento de auditoría
      await AuditEventRepository.create(auditEventData);
    } catch (error) {
      // Manejar errores al registrar el evento de auditoría
      console.error("Error registrando evento de auditoría:", error);
    }

    // Llamar al método original para finalizar la respuesta
    end(...args);
  };

  next(); // Continuar con el siguiente middleware o ruta
};

export default auditMiddleware;
