import { InfoIcon, LoaderCircleIcon } from "lucide-react"

import { Button } from "@/components/ui/button"

import type { TransportOption } from "../lib/transport-options"
import { StepHeader } from "./StepHeader"

interface NoVehicleStepProps {
  option: TransportOption
  isSaving: boolean
  onBack: () => void
  onSave: () => void
}

/**
 * Caso C: bus, taxi, plataforma, bicicleta, caminando u otro.
 * No se pide información del vehículo ni checklist preoperacional.
 */
export function NoVehicleStep({
  option,
  isSaving,
  onBack,
  onSave,
}: NoVehicleStepProps) {
  const Icon = option.icon

  return (
    <div className="flex flex-col gap-6">
      <StepHeader
        step={2}
        totalSteps={2}
        onBack={onBack}
        title="Confirma tu registro"
        description="Este medio de transporte no requiere inspección preoperacional."
      />

      <div className="flex items-center gap-3 rounded-xl border p-4">
        <span className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-muted text-muted-foreground">
          <Icon className="size-5" aria-hidden="true" />
        </span>
        <div>
          <p className="text-sm font-medium">{option.label}</p>
          <p className="text-xs text-muted-foreground">Sin vehículo asociado</p>
        </div>
      </div>

      <p className="flex items-start gap-2 text-sm text-muted-foreground">
        <InfoIcon className="mt-0.5 size-4 shrink-0" aria-hidden="true" />
        No se solicita checklist porque no conduces un vehículo.
      </p>

      <Button
        type="button"
        className="w-full sm:w-auto sm:self-end"
        disabled={isSaving}
        onClick={onSave}
      >
        {isSaving ? (
          <>
            <LoaderCircleIcon className="animate-spin" /> Guardando
            inspección...
          </>
        ) : (
          "Guardar inspección"
        )}
      </Button>
    </div>
  )
}
