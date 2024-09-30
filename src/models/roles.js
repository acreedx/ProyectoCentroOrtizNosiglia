import mongoose from "mongoose";
const { Schema } = mongoose;
/*
  Roles:
  Paciente
  Dentista
  Secretario
  Administrador
  Enfermero
  Medico temporal
*/
const roleSchema = new Schema(
  {
    roleName: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    permissions: [
      {
        type: Schema.Types.ObjectId,
        ref: "Permission",
        required: true,
      },
    ],
    active: { type: Boolean, required: true },
  },
  {
    timestamps: true,
  }
);
const Rol = mongoose.model("Rol", roleSchema);

export default Rol;
