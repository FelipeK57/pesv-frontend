import { LoaderCircleIcon } from "lucide-react"

import { cn } from "@/lib/utils"

function Spinner({ className, ...props }: React.ComponentProps<"svg">) {
  return (
    <LoaderCircleIcon
      role="status"
      aria-label="Cargando"
      className={cn("size-4 animate-spin", className)}
      {...props}
    />
  )
}

interface LoadingStateProps extends React.ComponentProps<"div"> {
  label?: string
}

/** Estado de carga para listados y páginas: spinner centrado con texto opcional. */
function LoadingState({ label, className, ...props }: LoadingStateProps) {
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center gap-2 py-10 text-sm text-muted-foreground",
        className
      )}
      {...props}
    >
      <Spinner aria-label={label ?? "Cargando"} />
      {label ? <span>{label}</span> : null}
    </div>
  )
}

export { Spinner, LoadingState }
