import { useQuery } from "@tanstack/react-query"
import { VehiclesService } from "../services/vehicles.service"
import { useAuthUser } from "@/modules/auth/store/auth.store"

export function useVehicles() {
  const user = useAuthUser()
  const vehiclesService = new VehiclesService()

  return useQuery({
    queryKey: ["vehicles", user?.id],
    queryFn: async () => vehiclesService.getVehicles(user!.id),
    enabled: Boolean(user),
  })
}
