import AuditEvent from "../models/auditEvent.js"; // Importa el modelo de AuditEvent
import auditEventValidation from "../zod_schemas/auditEventValidation.js";

export class AuditEventRepository {
  // Método para obtener todos los eventos de auditoría
  static async getAll() {
    return await AuditEvent.find();
  }

  static async getById(id) {
    const auditEvent = await AuditEvent.findById(id);
    if (!auditEvent) throw new Error("El evento de auditoría no existe");
    return auditEvent;
  }

  static async create(data) {
    const validatedData = auditEventValidation.parse(data);
    const newAuditEvent = new AuditEvent(validatedData);
    const savedAuditEvent = await newAuditEvent.save();
    return savedAuditEvent;
  }

  static async update(id, updateData) {
    const auditEvent = await AuditEvent.findById(id);
    if (!auditEvent) throw new Error("El evento de auditoría no existe");
    const validatedUpdateData = auditEventSchema.partial().parse(updateData);
    Object.assign(auditEvent, validatedUpdateData);
    const updatedAuditEvent = await auditEvent.save();
    return updatedAuditEvent;
  }

  static async delete(id) {
    const auditEvent = await AuditEvent.findById(id);
    if (!auditEvent) throw new Error("El evento de auditoría no existe");

    await auditEvent.remove();
    return { message: "Evento de auditoría eliminado con éxito" };
  }
}
