import { z } from "zod"

export const transportTypeSchema = z.enum([
  "OWN_VEHICLE",
  "BORROWED_VEHICLE",
  "BUS",
  "TAXI",
  "RIDESHARE",
  "BICYCLE",
  "WALKING",
  "OTHER",
])

export const checklistStatusSchema = z.enum(["PASS", "FAIL"])

export const inspectionItemSchema = z.object({
  itemName: z.string().trim().min(1, "El ítem es obligatorio").max(150),
  status: checklistStatusSchema,
  observation: z.string().nullish(),
})

export const inspectionVehicleDataSchema = z.object({
  mileage: z.number().int().min(0).nullish(),
})

export const inspectionSchema = z.object({
  employeeId: z.number().int().positive(),
  inspectionDate: z
    .string()
    .regex(/^\d{4}-\d{2}-\d{2}$/, "Formato esperado: yyyy-MM-dd"),
  transportType: transportTypeSchema,
  vehicleId: z.number().int().positive().nullish(),
  borrowedPlate: z.string().max(10).nullish(),
  borrowedBrand: z.string().max(50).nullish(),
  borrowedModel: z.string().max(50).nullish(),
  vehicleData: inspectionVehicleDataSchema.nullish(),
  items: z
    .array(inspectionItemSchema)
    .min(1, "Debe registrar al menos un ítem"),
})

export type InspectionRequest = z.infer<typeof inspectionSchema>
