import { z } from "zod";

const personValidation = z.object({
  systemUser: z.object({
    username: z
      .string()
      .min(3, {
        message: "El nombre de usuario debe tener al menos 3 caracteres",
      })
      .min(1, { message: "El nombre de usuario es obligatorio" }),
    password: z
      .string()
      .min(6, { message: "El password debe tener al menos 6 caracteres" })
      .min(1, { message: "El password es obligatorio" }),
  }),
  active: z.boolean().optional(),
});
export default personValidation;
