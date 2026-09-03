import {
  ArrowRightIcon,
  Pencil,
  PlusIcon,
  RouteIcon,
  Trash,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { LoadingState } from "@/components/ui/spinner"

import { useDisplacements } from "../hooks/useDisplacements"
import { formatTime } from "../lib/displacement-format"
import type { Displacement } from "../types"
import { DeleteDisplacementDialog } from "./DeleteDisplacementDialog"
import { DisplacementFormDialog } from "./DisplacementFormDialog"

interface DisplacementsListProps {
  inspectionId: number
  /** Oculta las acciones de crear/editar/eliminar (vista de supervisor). */
  readOnly?: boolean
}

export function DisplacementsList({
  inspectionId,
  readOnly = false,
}: DisplacementsListProps) {
  const {
    data: displacements,
    isLoading,
    isError,
  } = useDisplacements(inspectionId)

  return (
    <section className="flex flex-col gap-3">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h2 className="text-lg font-semibold">Desplazamientos</h2>
          <p className="text-sm text-muted-foreground">
            Recorridos registrados para esta inspección.
          </p>
        </div>
        {!readOnly && (
          <DisplacementFormDialog
            inspectionId={inspectionId}
            trigger={
              <Button size="sm">
                <PlusIcon /> Agregar desplazamiento
              </Button>
            }
          />
        )}
      </div>

      {isLoading ? (
        <LoadingState label="Cargando los desplazamientos..." />
      ) : isError ? (
        <p className="rounded-xl border border-destructive/40 bg-destructive/5 p-4 text-sm">
          No fue posible cargar los desplazamientos.
        </p>
      ) : displacements?.length === 0 ? (
        <p className="rounded-xl border border-dashed p-6 text-center text-sm text-muted-foreground">
          Aún no has registrado desplazamientos.
        </p>
      ) : (
        <Card className="rounded-lg">
          <CardContent>
            {displacements?.map((displacement: Displacement) => (
              <div
                key={displacement.id}
                className="flex flex-col justify-between gap-4 border-b py-3 first:pt-0 last:border-0 last:pb-0 md:flex-row"
              >
                <div className="min-w-0">
                  <div className="flex gap-4">
                    <span className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-muted text-muted-foreground">
                      <RouteIcon className="size-4" aria-hidden="true" />
                    </span>
                    <div>
                      <p className="flex flex-wrap items-center gap-2 text-sm font-medium">
                        {displacement.origin}
                        <ArrowRightIcon
                          className="size-4 text-muted-foreground"
                          aria-hidden="true"
                        />
                        {displacement.destination}
                      </p>
                      <p className="mt-1 text-sm text-muted-foreground">
                        {formatTime(displacement.departureTime)} -{" "}
                        {formatTime(displacement.arrivalTime)}
                      </p>
                    </div>
                  </div>
                  {displacement.observations && (
                    <p className="mt-2 text-sm text-muted-foreground">
                      {displacement.observations}
                    </p>
                  )}
                </div>

                {!readOnly && (
                <div className="flex shrink-0 items-center gap-2">
                  <DisplacementFormDialog
                    inspectionId={inspectionId}
                    displacement={displacement}
                    trigger={
                      <Button
                        size="icon-sm"
                        variant="outline"
                        aria-label="Editar desplazamiento"
                      >
                        <Pencil />
                      </Button>
                    }
                  />
                  <DeleteDisplacementDialog
                    inspectionId={inspectionId}
                    displacement={displacement}
                    trigger={
                      <Button
                        size="icon-sm"
                        variant="destructive"
                        aria-label="Eliminar desplazamiento"
                      >
                        <Trash />
                      </Button>
                    }
                  />
                </div>
                )}
              </div>
            ))}
          </CardContent>
        </Card>
      )}
    </section>
  )
}
