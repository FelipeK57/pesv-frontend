import { useMutation, useQueryClient } from "@tanstack/react-query"

import { DisplacementsService } from "../services/displacements.service"
import type { DisplacementInput } from "../schemas/displacements.schemas"
import { displacementsKey } from "./useDisplacements"

export function useCreateDisplacement(inspectionId: number) {
  const queryClient = useQueryClient()
  const displacementsService = new DisplacementsService()

  return useMutation({
    mutationFn: (data: DisplacementInput) =>
      displacementsService.createDisplacement({ ...data, inspectionId }),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: displacementsKey(inspectionId),
      })
    },
  })
}

export function useUpdateDisplacement(id: number, inspectionId: number) {
  const queryClient = useQueryClient()
  const displacementsService = new DisplacementsService()

  return useMutation({
    mutationFn: (data: DisplacementInput) =>
      displacementsService.updateDisplacement(id, { ...data, inspectionId }),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: displacementsKey(inspectionId),
      })
    },
  })
}

export function useDeleteDisplacement(id: number, inspectionId: number) {
  const queryClient = useQueryClient()
  const displacementsService = new DisplacementsService()

  return useMutation({
    mutationFn: () => displacementsService.deleteDisplacement(id),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: displacementsKey(inspectionId),
      })
    },
  })
}
