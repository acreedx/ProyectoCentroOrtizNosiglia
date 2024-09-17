import mongoose from "mongoose";
const { Schema } = mongoose;

const auditEventSchema = new Schema({});

const AuditEvent = mongoose.model("AuditEvent", auditEventSchema);

module.exports = AuditEvent;
