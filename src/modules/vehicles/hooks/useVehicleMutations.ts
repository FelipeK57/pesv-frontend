import { useMutation, useQueryClient } from "@tanstack/react-query"
import { VehiclesService } from "../services/vehicles.service"
import { useAuthUser } from "@/modules/auth/store/auth.store"
import type { VehicleInput } from "../schemas/vehicles.schemas"

export function useCreateVehicle() {
  const user = useAuthUser()
  const queryClient = useQueryClient()
  const vehiclesService = new VehiclesService()

  return useMutation({
    mutationFn: (data: VehicleInput) =>
      // employeeId proviene del token guardado en el store de autenticación.
      vehiclesService.createVehicle({ ...data, employeeId: user!.id }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["vehicles", user?.id] })
    },
  })
}

export function useUpdateVehicle(id: number) {
  const user = useAuthUser()
  const queryClient = useQueryClient()
  const vehiclesService = new VehiclesService()

  return useMutation({
    mutationFn: (data: VehicleInput) =>
      vehiclesService.updateVehicle(id, { ...data, employeeId: user!.id }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["vehicles", user?.id] })
    },
  })
}

export function useDeleteVehicle(id: number) {
  const user = useAuthUser()
  const queryClient = useQueryClient()
  const vehiclesService = new VehiclesService()

  return useMutation({
    mutationFn: () => vehiclesService.deleteVehicle(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["vehicles", user?.id] })
    },
  })
}
