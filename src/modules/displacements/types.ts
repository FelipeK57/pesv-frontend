export interface Displacement {
  id: number
  inspectionId: number
  origin: string
  destination: string
  /** `LocalTime` del backend: "HH:mm" o "HH:mm:ss". */
  departureTime?: string | null
  arrivalTime?: string | null
  observations?: string | null
  createdAt: string
  updatedAt: string
}
