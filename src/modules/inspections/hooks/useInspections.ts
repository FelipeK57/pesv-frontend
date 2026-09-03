import { useQuery } from "@tanstack/react-query"

import { useAuthUser } from "@/modules/auth/store/auth.store"
import { InspectionsService } from "../services/inspections.service"

export function useInspections() {
  const user = useAuthUser()
  const inspectionsService = new InspectionsService()

  return useQuery({
    queryKey: ["inspections", user?.id],
    queryFn: () => inspectionsService.getInspections(user!.id),
    enabled: Boolean(user),
  })
}

/** Inspecciones de un trabajador concreto (vista de supervisor). */
export function useEmployeeInspections(employeeId: number | null) {
  const inspectionsService = new InspectionsService()

  return useQuery({
    queryKey: ["inspections", employeeId],
    queryFn: () => inspectionsService.getInspections(employeeId!),
    enabled: employeeId !== null,
  })
}

/** Resumen de actividad por trabajador para el dashboard de supervisión. */
export function useEmployeeStats() {
  const inspectionsService = new InspectionsService()

  return useQuery({
    queryKey: ["inspections", "employee-stats"],
    queryFn: () => inspectionsService.getEmployeeStats(),
  })
}

/** Detalle bajo demanda: solo se consulta cuando el diálogo está abierto. */
export function useInspection(id: number | null) {
  const inspectionsService = new InspectionsService()

  return useQuery({
    queryKey: ["inspection", id],
    queryFn: () => inspectionsService.getInspection(id!),
    enabled: id !== null,
  })
}
