import { Button } from "@/components/ui/button"
import { LoadingState } from "@/components/ui/spinner"
import { useEmployeeStats } from "@/modules/inspections/hooks/useInspections"

import { EmployeeStatsTable } from "../components/EmployeeStatsTable"

export function SupervisorHomePage() {
  const { data, isLoading, isError, refetch, isFetching } = useEmployeeStats()

  return (
    <main className="mx-auto flex max-w-4xl flex-col gap-6">
      <div className="space-y-2">
        <h1 className="text-2xl font-semibold">Dashboard de supervisión</h1>
        <p className="text-sm text-muted-foreground">
          Actividad registrada por los trabajadores del equipo
        </p>
      </div>

      {isLoading ? (
        <LoadingState label="Cargando la actividad del equipo..." />
      ) : isError ? (
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
      ) : (
        <EmployeeStatsTable stats={data ?? []} />
      )}
    </main>
  )
}
