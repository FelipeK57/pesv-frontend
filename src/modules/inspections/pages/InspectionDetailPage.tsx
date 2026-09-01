import { Link, useNavigate, useParams } from "react-router"
import {
  ArrowLeftIcon,
  CheckIcon,
  CircleAlertIcon,
  LoaderCircleIcon,
} from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Field, FieldLabel } from "@/components/ui/field"
import { Input } from "@/components/ui/input"

import { useVehicles } from "@/modules/vehicles/hooks/useVehicles"
import type { Vehicle } from "@/modules/vehicles/types"

import { useInspection } from "../hooks/useInspections"
import { isSyntheticItem } from "../lib/checklist-items"
import {
  countFailures,
  describeInspectionVehicle,
  formatInspectionDate,
  itemObservation,
} from "../lib/inspection-format"
import { TRANSPORT_TYPE_LABELS } from "../lib/transport-options"

export function InspectionDetailPage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const inspectionId = Number(id)
  const isValidId = Number.isInteger(inspectionId) && inspectionId > 0

  const { data, isLoading, isError, refetch, isFetching } = useInspection(
    isValidId ? inspectionId : null
  )
  const { data: vehicles } = useVehicles()

  if (!isValidId) {
    return (
      <StateShell>
        <p className="text-sm text-muted-foreground">
          La inspección solicitada no existe.
        </p>
      </StateShell>
    )
  }

  if (isLoading) {
    return (
      <StateShell>
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <LoaderCircleIcon
            className="size-4 animate-spin"
            aria-hidden="true"
          />
          Cargando la inspección...
        </div>
      </StateShell>
    )
  }

  if (isError || !data) {
    return (
      <StateShell>
        <div className="flex flex-col items-start gap-3 rounded-xl border border-destructive/40 bg-destructive/5 p-4">
          <p className="text-sm">No fue posible cargar la información.</p>
          <Button
            variant="outline"
            size="sm"
            disabled={isFetching}
            onClick={() => refetch()}
          >
            Reintentar
          </Button>
        </div>
      </StateShell>
    )
  }

  const items = (data.items ?? []).filter(
    (item) => !isSyntheticItem(item.itemName)
  )
  const failures = countFailures(items)
  const vehicleLabel = describeInspectionVehicle(data, (vehicleId) =>
    (vehicles as Vehicle[] | undefined)?.find(
      (vehicle) => vehicle.id === vehicleId
    )
  )
  const hasChecklist = items.length > 0

  return (
    <main className="mx-auto w-full max-w-2xl px-4 py-6">
      <div className="flex flex-col gap-6">
        <header className="flex flex-col gap-3">
          <Button
            variant="ghost"
            size="icon"
            aria-label="Volver al listado"
            className="-ml-2 self-start"
            onClick={() => navigate("/employees/inspections")}
          >
            <ArrowLeftIcon />
          </Button>

          <div>
            <h1 className="text-2xl font-semibold">
              {hasChecklist
                ? "Inspección preoperacional"
                : "Registro de transporte"}
            </h1>
            <p className="mt-1 text-sm text-muted-foreground">
              {formatInspectionDate(data.inspectionDate)} ·{" "}
              {TRANSPORT_TYPE_LABELS[data.transportType]}
              {vehicleLabel !== "—" ? ` · ${vehicleLabel}` : ""}
            </p>
          </div>

          {failures !== null && hasChecklist && (
            <Badge
              variant={failures > 0 ? "destructive" : "secondary"}
              className="self-start"
            >
              {failures === 0
                ? "Sin novedades"
                : failures === 1
                  ? "1 elemento requiere atención"
                  : `${failures} elementos requieren atención`}
            </Badge>
          )}
        </header>

        {!hasChecklist ? (
          <p className="rounded-xl border border-dashed p-6 text-sm text-muted-foreground">
            Este medio de transporte no requiere inspección preoperacional.
          </p>
        ) : (
          <>
            <Field>
              <FieldLabel>Kilometraje</FieldLabel>
              <Input
                readOnly
                value={data.vehicleData?.mileage ?? ""}
                placeholder="—"
              />
            </Field>

            <ul className="flex flex-col gap-3">
              {items.map((item) => (
                <li key={item.id} className="rounded-xl border p-4">
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <span className="text-sm font-medium">{item.itemName}</span>
                    {item.status === "PASS" ? (
                      <span className="flex shrink-0 items-center gap-1.5 text-sm font-medium text-primary">
                        <CheckIcon className="size-4" aria-hidden="true" />
                        Cumple
                      </span>
                    ) : (
                      <span className="flex shrink-0 items-center gap-1.5 text-sm font-medium text-destructive">
                        <CircleAlertIcon
                          className="size-4"
                          aria-hidden="true"
                        />
                        No cumple
                      </span>
                    )}
                  </div>

                  {item.status === "FAIL" && (
                    <p className="mt-2 text-sm text-muted-foreground">
                      {itemObservation(item)}
                    </p>
                  )}
                </li>
              ))}
            </ul>
          </>
        )}
      </div>
    </main>
  )
}

function StateShell({ children }: { children: React.ReactNode }) {
  return (
    <main className="mx-auto flex w-full max-w-2xl flex-col gap-4 px-4 py-6">
      <Button
        variant="ghost"
        size="sm"
        className="-ml-2 self-start"
        nativeButton={false}
        render={<Link to="/employees/inspections" />}
      >
        <ArrowLeftIcon /> Volver al listado
      </Button>
      {children}
    </main>
  )
}
