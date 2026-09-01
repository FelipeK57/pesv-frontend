import { AlertTriangleIcon } from "lucide-react"
import { Controller, useWatch, type UseFormReturn } from "react-hook-form"

import { Button } from "@/components/ui/button"
import { Spinner } from "@/components/ui/spinner"
import { Field, FieldLabel } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"

import type {
  ChecklistFormInput,
  ChecklistFormValues,
} from "../schemas/inspection-form.schemas"
import { StatusButton } from "./StatusButton"
import { StepHeader } from "./StepHeader"

interface ChecklistStepProps {
  /** Contexto del vehículo: "Moto · Yamaha XTZ 125 · ABC123". */
  vehicleContext: string
  form: UseFormReturn<ChecklistFormInput, unknown, ChecklistFormValues>
  isSaving: boolean
  onBack: () => void
  onSubmit: (data: ChecklistFormValues) => void
}

export function ChecklistStep({
  vehicleContext,
  form,
  isSaving,
  onBack,
  onSubmit,
}: ChecklistStepProps) {
  const items = useWatch({ control: form.control, name: "items" })
  const errors = form.formState.errors

  const hasUnanswered = Boolean(
    errors.items && items?.some((item) => item.status == null)
  )
  const hasMissingObservation = Boolean(
    errors.items &&
    items?.some((item) => item.status === "FAIL" && !item.observation?.trim())
  )

  return (
    <form
      className="flex flex-col gap-6"
      onSubmit={form.handleSubmit(onSubmit)}
      noValidate
    >
      <StepHeader
        step={3}
        totalSteps={3}
        onBack={onBack}
        title="Inspección preoperacional"
        description={vehicleContext}
      />

      <Controller
        name="mileage"
        control={form.control}
        render={({ field, fieldState }) => (
          <Field>
            <FieldLabel>Kilometraje</FieldLabel>
            <Input
              type="number"
              min={0}
              inputMode="numeric"
              placeholder="15430"
              {...field}
              value={field.value ?? ""}
              onChange={(event) => {
                const next = event.target.valueAsNumber
                field.onChange(Number.isNaN(next) ? undefined : next)
              }}
            />
            {fieldState.error && (
              <span className="text-sm text-red-500">
                {fieldState.error.message}
              </span>
            )}
          </Field>
        )}
      />

      <ul className="flex flex-col gap-3">
        {(items ?? []).map((item, index) => (
          <li key={item.itemName} className="rounded-xl border p-4">
            <Controller
              name={`items.${index}.status`}
              control={form.control}
              render={({ field, fieldState }) => (
                <div className="flex flex-col gap-3">
                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3">
                    <span className="text-sm font-medium">{item.itemName}</span>
                    <div
                      role="radiogroup"
                      aria-label={item.itemName}
                      className="flex gap-2"
                    >
                      <StatusButton
                        label="Cumple"
                        active={field.value === "PASS"}
                        tone="pass"
                        onClick={() => {
                          field.onChange("PASS")
                          // Al volver a "Cumple" se limpia la novedad asociada.
                          form.setValue(`items.${index}.observation`, "")
                          form.clearErrors(`items.${index}.observation`)
                        }}
                      />
                      <StatusButton
                        label="No cumple"
                        active={field.value === "FAIL"}
                        tone="fail"
                        onClick={() => field.onChange("FAIL")}
                      />
                    </div>
                  </div>
                  {fieldState.error && (
                    <span className="text-sm text-red-500">
                      {fieldState.error.message}
                    </span>
                  )}
                </div>
              )}
            />

            {item.status === "FAIL" && (
              <Controller
                name={`items.${index}.observation`}
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field className="mt-3">
                    <FieldLabel>Describe la novedad</FieldLabel>
                    <Textarea
                      rows={2}
                      {...field}
                      value={field.value ?? ""}
                      aria-invalid={Boolean(fieldState.error)}
                    />
                    {fieldState.error && (
                      <span className="text-sm text-red-500">
                        {fieldState.error.message}
                      </span>
                    )}
                  </Field>
                )}
              />
            )}
          </li>
        ))}
      </ul>

      {(hasUnanswered || hasMissingObservation) && (
        <div className="flex flex-col gap-1 rounded-xl border border-destructive/40 bg-destructive/5 p-4 text-sm">
          {hasUnanswered && (
            <p className="flex items-center gap-2">
              <AlertTriangleIcon
                className="size-4 shrink-0"
                aria-hidden="true"
              />
              Completa todos los elementos de la inspección.
            </p>
          )}
          {hasMissingObservation && (
            <p className="flex items-center gap-2">
              <AlertTriangleIcon
                className="size-4 shrink-0"
                aria-hidden="true"
              />
              Describe la novedad de los elementos que no cumplen.
            </p>
          )}
        </div>
      )}

      <Button
        type="submit"
        className="w-full sm:w-auto sm:self-end"
        disabled={isSaving}
      >
        {isSaving ? (
          <>
            <Spinner /> Guardando inspección...
          </>
        ) : (
          "Guardar inspección"
        )}
      </Button>
    </form>
  )
}
