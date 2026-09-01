import { Link } from "react-router"
import { LoaderCircleIcon, PlusIcon } from "lucide-react"

import { Button } from "@/components/ui/button"

import { InspectionsTable } from "../components/InspectionsTable"
import { useInspections } from "../hooks/useInspections"

export function InspectionsPage() {
  const { data, isLoading, isError, refetch, isFetching } = useInspections()

  return (
    <main className="mx-auto flex w-full max-w-4xl flex-col">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h1 className="text-2xl font-semibold">Mis inspecciones</h1>
        <Button
          nativeButton={false}
          render={<Link to="/employees/inspections/new" />}
        >
          <PlusIcon /> Nueva inspección
        </Button>
      </div>
      <p className="mt-2 text-sm text-muted-foreground">
        Historial de tus inspecciones preoperacionales registradas.
      </p>

      <div className="mt-6">
        {isLoading ? (
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <LoaderCircleIcon
              className="size-4 animate-spin"
              aria-hidden="true"
            />
            Cargando tus inspecciones...
          </div>
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
          <InspectionsTable inspections={data ?? []} />
        )}
      </div>
    </main>
  )
}
