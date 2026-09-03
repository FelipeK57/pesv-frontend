import { Link, useParams } from "react-router"
import { ArrowLeftIcon } from "lucide-react"

import { Button } from "@/components/ui/button"
import { LoadingState } from "@/components/ui/spinner"
import { InspectionsTable } from "@/modules/inspections/components/InspectionsTable"
import {
  useEmployeeInspections,
  useEmployeeStats,
} from "@/modules/inspections/hooks/useInspections"

export function EmployeeInspectionsPage() {
  const { employeeId } = useParams()
  const id = Number(employeeId)
  const isValidId = Number.isInteger(id) && id > 0

  const { data, isLoading, isError, refetch, isFetching } = useEmployeeInspections(
    isValidId ? id : null
  )
  const { data: stats } = useEmployeeStats()
  const employee = stats?.find((row) => row.employeeId === id)
  const employeeName = employee
    ? `${employee.name} ${employee.lastName}`
    : "Trabajador"

  return (
    <main className="mx-auto flex w-full max-w-4xl flex-col">
      <Button
        variant="ghost"
        size="sm"
        className="-ml-2 self-start"
        nativeButton={false}
        render={<Link to="/supervisor" />}
      >
        <ArrowLeftIcon /> Volver al dashboard
      </Button>

      <h1 className="mt-2 text-2xl font-semibold">
        Inspecciones de {employeeName}
      </h1>
      <p className="mt-2 text-sm text-muted-foreground">
        Historial de inspecciones preoperacionales registradas por el trabajador.
      </p>

      <div className="mt-6">
        {!isValidId ? (
          <p className="text-sm text-muted-foreground">
            El trabajador solicitado no existe.
          </p>
        ) : isLoading ? (
          <LoadingState label="Cargando las inspecciones..." />
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
          <InspectionsTable
            inspections={data ?? []}
            basePath={`/supervisor/employees/${id}/inspections`}
            emptyMessage="El trabajador aún no ha registrado inspecciones."
          />
        )}
      </div>
    </main>
  )
}
