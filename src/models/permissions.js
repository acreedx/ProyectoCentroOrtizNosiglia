import mongoose from "mongoose";
const { Schema } = mongoose;
/*
  Permisos:
  Crear usuarios
  Editar usuarios
  Deshabilitar usuarios
  Crear roles
  Editar roles
  Asignar roles
  Deshabilitar roles
  Crear permisos
  Editar permisos
  Deshabilitar permisos
  Editar odontogramas de pacientes
  Crear citas
  Editar citas
  Deshabilitar citas
*/
const permissionSchema = new Schema(
  {
    permissionName: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    code: {
      type: String,
      required: true,
      unique: true,
    },
    active: { type: Boolean, required: true },
  },
  {
    timestamps: true,
  }
);
const Permission = mongoose.model("Permission", permissionSchema);

export default Permission;
