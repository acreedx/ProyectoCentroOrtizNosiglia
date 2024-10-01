import { z } from "zod";

const auditEventValidation = z.object({
  type: z.object({
    coding: z
      .array(
        z.object({
          system: z
            .string()
            .default("http://terminology.hl7.org/CodeSystem/audit-event-type"),
          code: z.string().min(1, "El campo 'code' es obligatorio"),
          display: z.string().min(1, "El campo 'display' es obligatorio"),
        })
      )
      .nonempty("El campo 'type.coding' es obligatorio"),
  }),
  action: z.enum(["create", "update", "delete", "execute"], {
    required_error: "El campo 'action' es obligatorio",
  }),
  severity: z.enum(["low", "medium", "high"], {
    required_error: "El campo 'severity' es obligatorio",
  }),
  occurredDateTime: z
    .string()
    .min(1, "El campo 'occurredDateTime' es obligatorio"),
  outcome: z.object({
    code: z.enum(["0", "4", "8", "12"], {
      required_error: "El campo 'outcome.code' es obligatorio",
    }),
    description: z.enum(
      ["Success", "Minor failure", "Serious failure", "Major failure"],
      { required_error: "El campo 'outcome.description' es obligatorio" }
    ),
  }),
  patient: z
    .object({
      reference: z.string().optional(), // Aquí puedes ajustar la validación según lo que necesites
      display: z.string().optional(),
    })
    .optional(),
  encounter: z.object({
    reference: z
      .string()
      .min(1, "El campo 'encounter.reference' es obligatorio"),
    display: z.string().optional(),
  }),
  agent: z
    .array(
      z.object({
        who: z.object({
          reference: z.string().refine((ref) => ref.startsWith("Person/"), {
            message:
              "El campo 'who.reference' debe ser un identificador de 'Person'",
          }),
          display: z.string().optional(),
        }),
        requestor: z.boolean(),
        type: z.object({
          coding: z.array(
            z.object({
              system: z
                .string()
                .default("http://hl7.org/fhir/ValueSet/practitioner-role"),
              code: z.enum([
                "paciente",
                "dentista",
                "secretario",
                "administrador",
                "enfermero",
                "medico_temporal",
              ]),
              display: z.enum([
                "Paciente",
                "Dentista",
                "Secretario",
                "Administrador",
                "Enfermero",
                "Médico Temporal",
              ]),
            })
          ),
        }),
        network: z.object({
          address: z
            .string()
            .min(1, "El campo 'network.address' es obligatorio"),
          type: z.string().default("Network Address"),
        }),
      })
    )
    .optional(),
});
export default auditEventValidation;
