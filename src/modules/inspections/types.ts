import type { Vehicle } from "../vehicles/types"

export type TransportType =
  | "OWN_VEHICLE"
  | "BORROWED_VEHICLE"
  | "BUS"
  | "TAXI"
  | "RIDESHARE"
  | "BICYCLE"
  | "WALKING"
  | "OTHER"

export type ChecklistStatus = "PASS" | "FAIL"

export interface Inspection {
  id: number
  employeeId: number
  inspectionDate: Date
  transportType: TransportType
  vehicleId?: number
  vehicle?: Vehicle
  borrowedVehiclePlate?: string | null
  borrowedVehicleBrand?: string | null
  borrowedVehicleModel?: string | null
  /**
   * Alias que expone el backend con el mismo nombre del request
   * (`borrowed_plate`), según el endpoint que responda.
   */
  borrowedPlate?: string | null
  borrowedBrand?: string | null
  borrowedModel?: string | null
  active: boolean
  createdAt: string
  updatedAt: string
}

export interface InspectionItem {
  id: number
  inspectionId: number
  itemName: string
  status: ChecklistStatus
  observations?: string | null
  /** Alias con el mismo nombre del request (`observation`). */
  observation?: string | null
  createdAt: string
  updatedAt: string
}

export interface InspectionVehicleData {
  id: number
  inspectionId: number
  mileage: number
}

/** Ítem tal como se envía al crear la inspección. */
export interface InspectionItemInput {
  itemName: string
  status: ChecklistStatus
  observation?: string | null
}

/**
 * Inspección con sus relaciones. El backend puede omitir `items` o
 * `vehicleData` en el listado, por eso son opcionales.
 */
export interface InspectionDetail extends Inspection {
  items?: InspectionItem[]
  vehicleData?: InspectionVehicleData | null
}
