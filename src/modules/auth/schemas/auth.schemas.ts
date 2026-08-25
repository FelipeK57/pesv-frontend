import { z } from "zod"

export const loginSchema = z.object({
  email: z.email({ message: "Correo electrónico inválido" }),
  password: z
    .string()
    .min(6, { message: "La contraseña debe tener al menos 6 caracteres" }),
})

export type LoginInput = z.infer<typeof loginSchema>
