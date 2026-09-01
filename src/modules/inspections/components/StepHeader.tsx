import { ArrowLeftIcon } from "lucide-react"

import { Button } from "@/components/ui/button"

interface StepHeaderProps {
  title: string
  description?: string
  /** Si se recibe, se muestra el botón para regresar al paso anterior. */
  onBack?: () => void
  step: number
  totalSteps: number
}

export function StepHeader({
  title,
  description,
  onBack,
  step,
  totalSteps,
}: StepHeaderProps) {
  return (
    <header className="flex flex-col gap-3">
      <div className="flex items-center gap-2">
        {onBack && (
          <Button
            type="button"
            variant="ghost"
            size="icon"
            aria-label="Volver al paso anterior"
            onClick={onBack}
          >
            <ArrowLeftIcon />
          </Button>
        )}
        <span className="text-xs font-medium text-muted-foreground">
          Paso {step} de {totalSteps}
        </span>
      </div>

      <div className="flex gap-1.5" aria-hidden="true">
        {Array.from({ length: totalSteps }, (_, index) => (
          <span
            key={index}
            className={
              index < step
                ? "h-1 flex-1 rounded-full bg-primary"
                : "h-1 flex-1 rounded-full bg-muted"
            }
          />
        ))}
      </div>

      <div>
        <h1 className="text-2xl font-semibold">{title}</h1>
        {description && (
          <p className="mt-1 text-sm text-muted-foreground">{description}</p>
        )}
      </div>
    </header>
  )
}
