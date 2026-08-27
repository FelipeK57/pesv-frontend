import api from "@/config/api"

export class VehiclesService {
  async getVehicles(employeeId: number) {
    const response = await api.get("/vehicles", { params: { employeeId } })
    return response.data
  }
}
