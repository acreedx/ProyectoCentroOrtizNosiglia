import { AuditEvent } from "./models/auditEvent"; // Importa tu modelo de evento de auditoría
import { AuditOutcomeCodes, SeverityLevels } from "./auditConstants"; // Importa tus constantes

// Función para crear un evento de auditoría
export const logAuditEvent = async ({
  type,
  action,
  severity = SeverityLevels.MEDIUM,
  user,
  patient,
  encounter,
  outcomeCode = AuditOutcomeCodes.SUCCESS,
  outcomeDescription = "Success",
}) => {
  const auditEventData = {
    resourceType: "AuditEvent",
    type: {
      coding: [
        {
          system: "http://terminology.hl7.org/CodeSystem/audit-event-type",
          code: type,
          display: "API Request", // O personaliza según el tipo
        },
      ],
    },
    action,
    severity,
    occurredDateTime: new Date().toISOString(),
    outcome: {
      code: outcomeCode,
      description: outcomeDescription,
    },
    patient: patient || {},
    encounter: encounter || {},
    agent: [
      {
        who: {
          reference: user._id,
          display: user.nombreUsuario,
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
          address: user.ipAddress, // O ajusta esto según tu lógica
          type: "Network Address",
        },
      },
    ],
  };

  try {
    // Guarda el evento de auditoría en la base de datos
    await AuditEvent.create(auditEventData);
  } catch (error) {
    console.error("Error registrando evento de auditoría:", error);
  }
};
