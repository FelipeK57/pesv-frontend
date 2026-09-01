import type { Vehicle } from "@/modules/vehicles/types"

import type { InspectionDetail, InspectionItem } from "../types"

/** Acepta tanto `Date` serializada como texto `yyyy-MM-dd`. */
export function formatInspectionDate(value: string | Date) {
  const iso = typeof value === "string" ? value : value.toISOString()
  const [year, month, day] = iso.slice(0, 10).split("-").map(Number)
  if (!year || !month || !day) return "—"
  return new Date(year, month - 1, day).toLocaleDateString("es-CO", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  })
}

/** Clave ordenable de la fecha, sin depender del formato de presentación. */
export function inspectionDateKey(value: string | Date) {
  return typeof value === "string"
    ? value.slice(0, 10)
    : value.toISOString().slice(0, 10)
}

function join(brand?: string | null, model?: string | null, plate?: string) {
  const name = `${brand ?? ""} ${model ?? ""}`.trim()
  return name ? `${name} · ${plate}` : plate!
}

/**
 * "Yamaha XTZ 125 · ABC123", o "—" cuando no hubo vehículo.
 *
 * `resolveVehicle` permite recuperar el vehículo propio cuando el listado
 * responde solo con `vehicleId` y sin la relación `vehicle`.
 */
export function describeInspectionVehicle(
  inspection: InspectionDetail,
  resolveVehicle?: (vehicleId: number) => Vehicle | undefined
) {
  const own =
    inspection.vehicle ??
    (inspection.vehicleId ? resolveVehicle?.(inspection.vehicleId) : undefined)

  if (own) return join(own.brand, own.model, own.plate)

  // El backend puede nombrar los campos del prestado de las dos formas.
  const plate =
    inspection.borrowedVehiclePlate ?? inspection.borrowedPlate ?? undefined
  if (plate) {
    return join(
      inspection.borrowedVehicleBrand ?? inspection.borrowedBrand,
      inspection.borrowedVehicleModel ?? inspection.borrowedModel,
      plate
    )
  }

  return "—"
}

export function countFailures(items?: InspectionItem[]) {
  if (!items) return null
  return items.filter((item) => item.status === "FAIL").length
}

/**
 * La observación de un ítem: el request la envía como `observation` y algunos
 * endpoints la devuelven como `observations`, así que aceptamos ambos nombres.
 */
export function itemObservation(item: InspectionItem) {
  return item.observations ?? item.observation ?? ""
}
