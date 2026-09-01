import { isAxiosError } from "axios"

import api from "@/config/api"
import type { Inspection, InspectionDetail } from "../types"
import type { InspectionRequest } from "../schemas/inspections.schema"

function handleError(error: unknown, fallback: string): never {
  if (isAxiosError(error)) {
    const message = error.response?.data?.message
    throw new Error(message ?? fallback, { cause: error })
  }
  throw error
}

export class InspectionsService {
  async getInspections(employeeId: number) {
    try {
      const response = await api.get("/inspections", { params: { employeeId } })
      return (response.data ?? []) as InspectionDetail[]
    } catch (error) {
      handleError(error, "Error al cargar las inspecciones")
    }
  }

  async getInspection(id: number) {
    try {
      const response = await api.get(`/inspections/${id}`)
      return response.data as InspectionDetail
    } catch (error) {
      handleError(error, "Error al cargar la inspección")
    }
  }

  async createInspection(data: InspectionRequest) {
    try {
      const response = await api.post("/inspections", data)
      return response.data as Inspection
    } catch (error) {
      handleError(error, "Error al registrar la inspección")
    }
  }
}
