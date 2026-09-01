import { useMutation, useQueryClient } from "@tanstack/react-query"

import { useAuthUser } from "@/modules/auth/store/auth.store"
import { InspectionsService } from "../services/inspections.service"
import {
  inspectionSchema,
  type InspectionRequest,
} from "../schemas/inspections.schema"

type NewInspection = Omit<InspectionRequest, "employeeId" | "inspectionDate">

/** Fecha local en formato yyyy-MM-dd (evita el corrimiento de `toISOString`). */
function todayISODate() {
  const now = new Date()
  const offset = now.getTimezoneOffset() * 60_000
  return new Date(now.getTime() - offset).toISOString().slice(0, 10)
}

export function useCreateInspection() {
  const user = useAuthUser()
  const queryClient = useQueryClient()
  const inspectionsService = new InspectionsService()

  return useMutation({
    mutationFn: (data: NewInspection) => {
      // employeeId proviene del token guardado en el store de autenticación.
      const payload = inspectionSchema.parse({
        ...data,
        employeeId: user!.id,
        inspectionDate: todayISODate(),
      })
      return inspectionsService.createInspection(payload)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["inspections", user?.id] })
    },
  })
}
