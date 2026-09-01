import { isAxiosError } from "axios"

import api from "@/config/api"
import type { DisplacementInput } from "../schemas/displacements.schemas"
import type { Displacement } from "../types"

function handleError(error: unknown, fallback: string): never {
  if (isAxiosError(error)) {
    const message = error.response?.data?.message
    throw new Error(message ?? fallback, { cause: error })
  }
  throw error
}

export class DisplacementsService {
  async getDisplacements(inspectionId: number) {
    try {
      const response = await api.get("/displacements", {
        params: { inspectionId },
      })
      return (response.data ?? []) as Displacement[]
    } catch (error) {
      handleError(error, "Error al cargar los desplazamientos")
    }
  }

  async createDisplacement(data: DisplacementInput & { inspectionId: number }) {
    try {
      const response = await api.post("/displacements", data)
      return response.data as Displacement
    } catch (error) {
      handleError(error, "Error al registrar el desplazamiento")
    }
  }

  async updateDisplacement(
    id: number,
    data: DisplacementInput & { inspectionId: number }
  ) {
    try {
      const response = await api.put(`/displacements/${id}`, data)
      return response.data as Displacement
    } catch (error) {
      handleError(error, "Error al actualizar el desplazamiento")
    }
  }

  async deleteDisplacement(id: number) {
    try {
      const response = await api.delete(`/displacements/${id}`)
      return response.data
    } catch (error) {
      handleError(error, "Error al eliminar el desplazamiento")
    }
  }
}
