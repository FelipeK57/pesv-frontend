import { CheckIcon } from "lucide-react"

import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

import { TRANSPORT_OPTIONS } from "../lib/transport-options"
import { StepHeader } from "./StepHeader"

interface TransportStepProps {
  selectedId: string | null
  onSelect: (id: string) => void
  onContinue: () => void
}

export function TransportStep({
  selectedId,
  onSelect,
  onContinue,
}: TransportStepProps) {
  return (
    <div className="flex flex-col gap-6">
      <StepHeader
        step={1}
        totalSteps={3}
        title="Registrar inspección"
        description="¿Cómo te vas a transportar hoy?"
      />

      <div
        role="radiogroup"
        aria-label="Medio de transporte"
        className="grid grid-cols-2 gap-3 sm:grid-cols-3"
      >
        {TRANSPORT_OPTIONS.map(({ id, label, icon: Icon }) => {
          const isSelected = selectedId === id

          return (
            <button
              key={id}
              type="button"
              role="radio"
              aria-checked={isSelected}
              onClick={() => onSelect(id)}
              className={cn(
                "relative flex aspect-square flex-col items-center justify-center gap-2 rounded-xl border p-3 text-center transition-colors outline-none",
                "focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50",
                isSelected
                  ? "border-primary bg-primary/5"
                  : "border-input hover:bg-muted/50"
              )}
            >
              {isSelected && (
                <span className="absolute top-2 right-2 flex size-5 items-center justify-center rounded-full bg-primary text-primary-foreground">
                  <CheckIcon className="size-3" aria-hidden="true" />
                </span>
              )}
              <Icon
                className={cn(
                  "size-7",
                  isSelected ? "text-primary" : "text-muted-foreground"
                )}
                aria-hidden="true"
              />
              <span className="text-sm font-medium text-balance">{label}</span>
            </button>
          )
        })}
      </div>

      <Button
        type="button"
        className="w-full sm:w-auto sm:self-end"
        disabled={!selectedId}
        onClick={onContinue}
      >
        Continuar
      </Button>
    </div>
  )
}
