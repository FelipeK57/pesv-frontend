export type VehicleType = "CAR" | "MOTORCYCLE"

export interface Vehicle {
  id: number
  employeeId: number
  plate: string
  vehicleType: VehicleType
  brand: string
  model: string
  year: number
  cc: number
  active: boolean
  createdAt: string
  updatedAt: string
}
