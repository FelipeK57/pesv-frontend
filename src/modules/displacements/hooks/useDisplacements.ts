import { useQuery } from "@tanstack/react-query"

import { DisplacementsService } from "../services/displacements.service"

export const displacementsKey = (inspectionId: number | null) => [
  "displacements",
  inspectionId,
]

export function useDisplacements(inspectionId: number | null) {
  const displacementsService = new DisplacementsService()

  return useQuery({
    queryKey: displacementsKey(inspectionId),
    queryFn: () => displacementsService.getDisplacements(inspectionId!),
    enabled: inspectionId !== null,
  })
}
