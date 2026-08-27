import { Link } from "react-router"
import { CarIcon, ChevronRightIcon, ClipboardPlusIcon, HistoryIcon } from "lucide-react"

import { Button } from "@/components/ui/button"

const secondaryActions = [
  {
    to: "/employees/inspections",
    icon: HistoryIcon,
    label: "Historial de inspecciones",
    description: "Consulta tus registros anteriores",
  },
  {
    to: "/employees/vehicles",
    icon: CarIcon,
    label: "Mis vehículos",
    description: "Gestiona la información de tus vehículos",
  },
] as const

export const QuickActions = () => {
  return (
    <div className="flex flex-col gap-3">
      <Button
        render={<Link to="/employees/inspections/new" />}
        nativeButton={false}
        className="h-auto w-full justify-between gap-3 rounded-xl p-4"
      >
        <span className="flex min-w-0 flex-1 items-center gap-3 text-left">
          <span className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-primary-foreground/15">
            <ClipboardPlusIcon className="size-5" aria-hidden="true" />
          </span>
          <span className="flex min-w-0 flex-col text-wrap">
            <span className="text-sm font-semibold">Nueva inspección</span>
            <span className="text-sm font-normal text-wrap text-primary-foreground/80">
              Registra el diagnóstico preventivo de tu vehículo
            </span>
          </span>
        </span>
        <ChevronRightIcon className="size-4 shrink-0" aria-hidden="true" />
      </Button>

      <div className="grid gap-3 sm:grid-cols-2">
        {secondaryActions.map(({ to, icon: Icon, label, description }) => (
          <Button
            key={to}
            render={<Link to={to} />}
            nativeButton={false}
            variant="outline"
            className="h-auto w-full justify-start gap-3 rounded-xl p-4"
          >
            <span className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-muted text-muted-foreground">
              <Icon className="size-4" aria-hidden="true" />
            </span>
            <span className="flex min-w-0 flex-1 flex-col text-left">
              <span className="text-sm font-medium">{label}</span>
              <span className="text-xs text-wrap font-normal text-muted-foreground">
                {description}
              </span>
            </span>
          </Button>
        ))}
      </div>
    </div>
  )
}
