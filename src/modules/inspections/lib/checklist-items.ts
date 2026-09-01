import type { VehicleType } from "@/modules/vehicles/types"

/** Nombre exacto que se persiste en `inspection_items.item_name`. */
const CAR_CHECKLIST_ITEMS = [
  "Cinturón de seguridad",
  "Frenos",
  "Sistema de dirección",
  "Testigos en el tablero",
  "Espejos retrovisores",
  "Luces",
  "Neumáticos/llantas",
  "Nivel de combustible",
  "Pito",
  "Plumillas",
  "Agua parabrisas",
] as const

const MOTORCYCLE_CHECKLIST_ITEMS = [
  "Casco certificado",
  "EPP: guantes, botas, chaqueta, rodilleras",
  "Frenos",
  "Sistema de dirección",
  "Espejos retrovisores",
  "Luces",
  "Neumáticos/llantas",
  "Nivel de combustible",
  "Pito",
] as const

/**
 * El kilometraje no es un ítem del checklist: viaja en `vehicleData.mileage`,
 * por eso se excluye de estas listas y se pinta como campo numérico aparte.
 */
export function getChecklistItems(vehicleType: VehicleType): readonly string[] {
  return vehicleType === "CAR"
    ? CAR_CHECKLIST_ITEMS
    : MOTORCYCLE_CHECKLIST_ITEMS
}

/**
 * Ítem sintético: el schema de la inspección exige al menos un elemento, así
 * que los transportes sin vehículo envían este marcador y se filtra al
 * presentar el checklist.
 */
export const NO_VEHICLE_ITEM = "Transporte sin vehículo"

export function isSyntheticItem(itemName: string) {
  return itemName === NO_VEHICLE_ITEM
}
