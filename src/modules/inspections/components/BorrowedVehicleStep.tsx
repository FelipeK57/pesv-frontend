import { Controller, type UseFormReturn } from "react-hook-form"

import { Button } from "@/components/ui/button"
import { Field, FieldLabel } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import type { VehicleType } from "@/modules/vehicles/types"

import { VEHICLE_TYPE_LABELS } from "../lib/transport-options"
import type { BorrowedVehicleInput } from "../schemas/inspection-form.schemas"
import { StepHeader } from "./StepHeader"

interface BorrowedVehicleStepProps {
  vehicleType: VehicleType
  form: UseFormReturn<BorrowedVehicleInput>
  onBack: () => void
  onContinue: (data: BorrowedVehicleInput) => void
}

export function BorrowedVehicleStep({
  vehicleType,
  form,
  onBack,
  onContinue,
}: BorrowedVehicleStepProps) {
  return (
    <form
      className="flex flex-col gap-6"
      onSubmit={form.handleSubmit(onContinue)}
      noValidate
    >
      <StepHeader
        step={2}
        totalSteps={3}
        onBack={onBack}
        title="Información del vehículo prestado"
        description={`Estos datos quedan asociados a la inspección; no se registra el ${VEHICLE_TYPE_LABELS[vehicleType].toLowerCase()} como vehículo propio.`}
      />

      <div className="flex flex-col gap-4">
        <Controller
          name="plate"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field>
              <FieldLabel>Placa</FieldLabel>
              <Input placeholder="ABC123" autoComplete="off" {...field} />
              {fieldState.error && (
                <span className="text-sm text-red-500">
                  {fieldState.error.message}
                </span>
              )}
            </Field>
          )}
        />
        <div className="grid gap-4 sm:grid-cols-2">
          <Controller
            name="brand"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field>
                <FieldLabel>Marca</FieldLabel>
                <Input placeholder="Toyota" autoComplete="off" {...field} />
                {fieldState.error && (
                  <span className="text-sm text-red-500">
                    {fieldState.error.message}
                  </span>
                )}
              </Field>
            )}
          />
          <Controller
            name="model"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field>
                <FieldLabel>Modelo</FieldLabel>
                <Input placeholder="Corolla" autoComplete="off" {...field} />
                {fieldState.error && (
                  <span className="text-sm text-red-500">
                    {fieldState.error.message}
                  </span>
                )}
              </Field>
            )}
          />
        </div>
      </div>

      <Button type="submit" className="w-full sm:w-auto sm:self-end">
        Continuar
      </Button>
    </form>
  )
}
