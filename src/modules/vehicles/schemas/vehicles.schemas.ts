import { z } from "zod"

const currentYear = new Date().getFullYear()

export const vehicleSchema = z.object({
  plate: z
    .string()
    .trim()
    .min(5, { message: "La placa debe tener al menos 5 caracteres" })
    .max(10, { message: "La placa no puede superar los 10 caracteres" })
    .transform((value) => value.toUpperCase()),
  vehicleType: z.enum(["CAR", "MOTORCYCLE"], {
    message: "Seleccione un tipo de vehículo",
  }),
  brand: z.string().trim().min(2, { message: "La marca es obligatoria" }),
  model: z.string().trim().min(1, { message: "El modelo es obligatorio" }),
  year: z
    .number({ message: "El año es obligatorio" })
    .int({ message: "El año debe ser un número entero" })
    .min(1900, { message: "El año debe ser mayor a 1900" })
    .max(currentYear + 1, {
      message: `El año no puede ser mayor a ${currentYear + 1}`,
    }),
  cc: z
    .number({ message: "El cilindraje es obligatorio" })
    .int({ message: "El cilindraje debe ser un número entero" })
    .positive({ message: "El cilindraje debe ser mayor a 0" }),
})

export type VehicleInput = z.infer<typeof vehicleSchema>
