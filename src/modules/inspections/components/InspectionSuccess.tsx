import { Link } from "react-router"
import { AlertTriangleIcon, CheckCircle2Icon, CheckIcon } from "lucide-react"

import { Button } from "@/components/ui/button"

export interface InspectionSummary {
  date: string
  transportLabel: string
  /** Vacío cuando el transporte no involucra vehículo. */
  vehicleLabel: string | null
  /** `null` cuando el medio de transporte no requiere checklist. */
  failedCount: number | null
}

function formatDate(isoDate: string) {
  const [year, month, day] = isoDate.split("-").map(Number)
  return new Date(year, month - 1, day).toLocaleDateString("es-CO", {
    day: "numeric",
    month: "long",
    year: "numeric",
  })
}

export function InspectionSuccess({
  date,
  transportLabel,
  vehicleLabel,
  failedCount,
}: InspectionSummary) {
  return (
    <div className="flex flex-col items-center gap-6 py-8 text-center">
      <span className="flex size-14 items-center justify-center rounded-full bg-emerald-600/10 text-emerald-600">
        <CheckCircle2Icon className="size-8" aria-hidden="true" />
      </span>

      <div>
        <h1 className="text-2xl font-semibold">Inspección registrada</h1>
        <p className="mt-1 text-sm text-muted-foreground">{formatDate(date)}</p>
      </div>

      <div className="w-full rounded-xl border p-4 text-left">
        <dl className="flex flex-col gap-3 text-sm">
          <div>
            <dt className="text-xs text-muted-foreground">
              Medio de transporte
            </dt>
            <dd className="font-medium">{transportLabel}</dd>
          </div>
          <div>
            <dt className="text-xs text-muted-foreground">Vehículo</dt>
            <dd className="font-medium">{vehicleLabel ?? "No aplica"}</dd>
          </div>
          <div>
            <dt className="text-xs text-muted-foreground">Resultado</dt>
            <dd className="font-medium">
              {failedCount === null ? (
                "No requiere inspección"
              ) : failedCount === 0 ? (
                <span className="flex items-center gap-1.5 text-emerald-700 dark:text-emerald-400">
                  <CheckIcon className="size-4" aria-hidden="true" />
                  Todos los elementos cumplen
                </span>
              ) : (
                <span className="flex items-center gap-1.5 text-destructive">
                  <AlertTriangleIcon className="size-4" aria-hidden="true" />
                  {failedCount === 1
                    ? "1 elemento requiere atención"
                    : `${failedCount} elementos requieren atención`}
                </span>
              )}
            </dd>
          </div>
        </dl>
      </div>

      <Button
        className="w-full"
        nativeButton={false}
        render={<Link to="/employees" />}
      >
        Finalizar
      </Button>
    </div>
  )
}
