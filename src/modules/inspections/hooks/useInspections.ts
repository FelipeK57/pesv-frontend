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

/** Detalle bajo demanda: solo se consulta cuando el diálogo está abierto. */
export function useInspection(id: number | null) {
  const inspectionsService = new InspectionsService()

  return useQuery({
    queryKey: ["inspection", id],
    queryFn: () => inspectionsService.getInspection(id!),
    enabled: id !== null,
  })
}
