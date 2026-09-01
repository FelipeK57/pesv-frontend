import { z } from "zod"

/** Paso 2 · Caso B — datos mínimos del vehículo prestado. */
export const borrowedVehicleSchema = z.object({
  plate: z
    .string()
    .trim()
    .min(5, { message: "La placa debe tener al menos 5 caracteres" })
    .max(10, { message: "La placa no puede superar los 10 caracteres" })
    .transform((value) => value.toUpperCase()),
  brand: z
    .string()
    .trim()
    .min(2, { message: "La marca es obligatoria" })
    .max(50, { message: "La marca no puede superar los 50 caracteres" }),
  model: z
    .string()
    .trim()
    .min(1, { message: "El modelo es obligatorio" })
    .max(50, { message: "El modelo no puede superar los 50 caracteres" }),
})

export type BorrowedVehicleInput = z.infer<typeof borrowedVehicleSchema>

/** Paso 3 · un ítem del checklist. `null` representa "sin responder". */
export const checklistItemFormSchema = z
  .object({
    itemName: z.string(),
    status: z.enum(["PASS", "FAIL"]).nullable(),
    observation: z.string().trim().default(""),
  })
  .refine((item) => item.status !== null, {
    message: "Selecciona Cumple o No cumple",
    path: ["status"],
  })
  .refine((item) => item.status !== "FAIL" || item.observation.length > 0, {
    message: "Describe la novedad",
    path: ["observation"],
  })

export const checklistFormSchema = z.object({
  mileage: z
    .number({ message: "El kilometraje es obligatorio" })
    .int({ message: "El kilometraje debe ser un número entero" })
    .min(0, { message: "El kilometraje no puede ser negativo" }),
  items: z.array(checklistItemFormSchema).min(1),
})

export type ChecklistFormInput = z.input<typeof checklistFormSchema>
export type ChecklistFormValues = z.output<typeof checklistFormSchema>
