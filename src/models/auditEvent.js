import mongoose from "mongoose";
const { Schema } = mongoose;

const auditEventSchema = new Schema(
  {
    resourceType: { type: String, default: "AuditEvent" },
    type: {
      coding: [
        {
          system: {
            type: String,
            default: "http://terminology.hl7.org/CodeSystem/audit-event-type",
          },
          code: {
            type: String,
            required: true,
            enum: [
              "creation", // Creación de un recurso
              "access", // Acceso a un recurso
              "modification", // Modificación de un recurso
              "deletion", // Eliminación de un recurso
              "execution", // Ejecución de una operación
            ],
          },
          display: { type: String, required: true },
        },
      ],
    },
    action: {
      type: String,
      required: true,
      enum: ["create", "update", "delete", "execute"],
    },
    severity: { type: String, enum: ["low", "medium", "high"], required: true },
    occurredDateTime: { type: String, required: true },
    outcome: {
      code: {
        type: String,
        required: true,
        enum: ["0", "4", "8", "12"], // Éxito, fallo menor, fallo grave, fallo mayor
      },
      description: {
        type: String,
        required: true,
        enum: [
          "Success", // La operación fue exitosa
          "Minor failure", // Fallo menor, se puede continuar
          "Serious failure", // Fallo serio, se requiere atención
          "Major failure", // Fallo mayor, operación no completada
        ],
      },
    },
    patient: {
      reference: {
        type: Schema.Types.ObjectId,
        ref: "Patient",
      },
      display: { type: String },
    },
    agent: [
      {
        who: {
          reference: { type: String, ref: "Persons" },
          display: { type: String },
        },
        requestor: { type: Boolean, required: true },
        type: {
          coding: [
            {
              system: {
                type: String,
                default: "http://hl7.org/fhir/ValueSet/practitioner-role",
              },
              code: {
                type: String,
                required: true,
                enum: [
                  "paciente", // Código para Paciente
                  "dentista", // Código para Dentista
                  "secretario", // Código para Secretario
                  "administrador", // Código para Administrador
                  "enfermero", // Código para Enfermero
                  "medico_temporal", // Código para Médico Temporal
                ],
              },
              display: {
                type: String,
                required: true,
                enum: [
                  "Paciente", // Display para Paciente
                  "Dentista", // Display para Dentista
                  "Secretario", // Display para Secretario
                  "Administrador", // Display para Administrador
                  "Enfermero", // Display para Enfermero
                  "Médico Temporal", // Display para Médico Temporal
                ],
              },
            },
          ],
        },
        network: {
          address: { type: String, required: true },
          type: { type: String, default: "Network Adress" },
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);
const AuditEvent = mongoose.model("AuditEvent", auditEventSchema);

export default AuditEvent;

/*
id: int;
resourceType: string;
type: {
    coding: [{
        system: string;
        code: string;
        display: string;
    }];
};
action: string;  // C, R, U, D (create, read, update, delete)
severity: string;  // low, moderate, high, critical
occurredDateTime: string;  // Date and time of the event
outcome: {
    code: string;
    description: string;
};
patient: {
    reference: string;  // Reference to Patient resource
    display: string;
};
encounter: {
    reference: string;  // Reference to Encounter resource
    display: string;
};
entity: [{
    what: {
        id: int;
        reference: string;
        display: string;
    };
    role: string;  // E.g., 'source' or 'destination'
    detail: [{
        type: string;
        value: string;
    }];
}];
agent: [{
    who: {
        reference: string;  // Reference to Practitioner or related entity
        display: string;
    };
    requestor: boolean;  // Whether the agent initiated the request
    type: {
        coding: [{
            system: string;
            code: string;
            display: string;
        }];
    };
    network: {
        address: string;  // IP address
        type: string;  // 1 for machine, 2 for IP, etc.
    };
}];
*/
