import api from "@/config/api"
import { isAxiosError } from "axios"
import type { Vehicle } from "../types"
import type { VehicleInput } from "../schemas/vehicles.schemas"

function handleError(error: unknown, fallback: string): never {
  if (isAxiosError(error)) {
    const message = error.response?.data?.message
    throw new Error(message ?? fallback, { cause: error })
  }
  throw error
}

export class VehiclesService {
  async getVehicles(employeeId: number) {
    const response = await api.get("/vehicles", { params: { employeeId } })
    return response.data
  }

  async createVehicle(data: VehicleInput & { employeeId: number }) {
    try {
      const response = await api.post("/vehicles", data)
      return response.data as Vehicle
    } catch (error) {
      handleError(error, "Error al crear el vehículo")
    }
  }

  async updateVehicle(id: number, data: VehicleInput & { employeeId: number }) {
    try {
      const response = await api.put(`/vehicles/${id}`, data)
      return response.data as Vehicle
    } catch (error) {
      handleError(error, "Error al actualizar el vehículo")
    }
  }

  async deleteVehicle(id: number) {
    try {
      const response = await api.delete(`/vehicles/${id}`)
      return response.data
    } catch (error) {
      handleError(error, "Error al eliminar el vehículo")
    }
  }
}
