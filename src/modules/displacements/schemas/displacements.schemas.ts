import { z } from "zod"

const timeField = z
  .string()
  .trim()
  .regex(/^\d{2}:\d{2}$/, { message: "Usa el formato HH:MM" })

export const displacementSchema = z
  .object({
    origin: z
      .string()
      .trim()
      .min(3, { message: "El origen es obligatorio" })
      .max(255, { message: "El origen no puede superar los 255 caracteres" }),
    destination: z
      .string()
      .trim()
      .min(3, { message: "El destino es obligatorio" })
      .max(255, { message: "El destino no puede superar los 255 caracteres" }),
    departureTime: timeField,
    arrivalTime: timeField,
    observations: z
      .string()
      .trim()
      .max(500, {
        message: "Las observaciones no pueden superar los 500 caracteres",
      })
      .optional(),
  })
  // Comparación lexicográfica: con "HH:MM" equivale a comparar los minutos.
  .refine((data) => data.arrivalTime > data.departureTime, {
    path: ["arrivalTime"],
    message: "La hora de llegada debe ser posterior a la de salida",
  })

export type DisplacementInput = z.infer<typeof displacementSchema>
