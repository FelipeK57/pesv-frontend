import type { Inspection } from "../inspections/types"

export interface Displacement {
  id: number
  inspectionId: number
  inspection: Inspection
  origin: string
  destination: string
  departureTime: Date
  arrivalTime: Date
  observations?: string
  createdAt: Date
  updatedAt: Date
}
