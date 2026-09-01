import { useState, type ReactElement } from "react"
import { Controller, useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Field, FieldLabel } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Spinner } from "@/components/ui/spinner"
import { Textarea } from "@/components/ui/textarea"
import { toast } from "@/components/ui/toast"

import {
  useCreateDisplacement,
  useUpdateDisplacement,
} from "../hooks/useDisplacementMutations"
import { toTimeInput } from "../lib/displacement-format"
import {
  displacementSchema,
  type DisplacementInput,
} from "../schemas/displacements.schemas"
import type { Displacement } from "../types"

const emptyDisplacement: DisplacementInput = {
  origin: "",
  destination: "",
  departureTime: "",
  arrivalTime: "",
  observations: "",
}

function toFormValues(displacement?: Displacement): DisplacementInput {
  if (!displacement) return emptyDisplacement
  return {
    origin: displacement.origin,
    destination: displacement.destination,
    departureTime: toTimeInput(displacement.departureTime),
    arrivalTime: toTimeInput(displacement.arrivalTime),
    observations: displacement.observations ?? "",
  }
}

interface DisplacementFormDialogProps {
  inspectionId: number
  /** Si se recibe un desplazamiento el diálogo funciona en modo edición. */
  displacement?: Displacement
  /** Debe ser un único elemento: `DialogTrigger` lo clona vía `render`. */
  trigger: ReactElement
}

export function DisplacementFormDialog({
  inspectionId,
  displacement,
  trigger,
}: DisplacementFormDialogProps) {
  const [open, setOpen] = useState(false)
  const isEdit = Boolean(displacement)

  const createDisplacement = useCreateDisplacement(inspectionId)
  const updateDisplacement = useUpdateDisplacement(
    displacement?.id ?? 0,
    inspectionId
  )
  const { mutate, isPending } = isEdit ? updateDisplacement : createDisplacement

  const form = useForm<DisplacementInput>({
    resolver: zodResolver(displacementSchema),
    defaultValues: toFormValues(displacement),
  })

  const handleOpenChange = (nextOpen: boolean) => {
    setOpen(nextOpen)
    if (nextOpen) form.reset(toFormValues(displacement))
  }

  const onSubmit = (data: DisplacementInput) => {
    mutate(data, {
      onSuccess: () => {
        setOpen(false)
        toast.add({
          type: "success",
          title: isEdit
            ? "Desplazamiento actualizado"
            : "Desplazamiento registrado",
        })
      },
      onError: (error) => {
        toast.add({ type: "error", title: error.message })
      },
    })
  }

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger render={trigger} />
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>
            {isEdit ? "Editar desplazamiento" : "Agregar desplazamiento"}
          </DialogTitle>
          <DialogDescription>
            {isEdit
              ? "Actualiza la información del desplazamiento."
              : "Registra un recorrido realizado durante esta inspección."}
          </DialogDescription>
        </DialogHeader>

        <form
          id="form-displacement"
          className="space-y-4"
          onSubmit={form.handleSubmit(onSubmit)}
        >
          <Controller
            name="origin"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field>
                <FieldLabel>Origen</FieldLabel>
                <Input placeholder="Sede principal" {...field} />
                {fieldState.error && (
                  <span className="text-sm text-red-500">
                    {fieldState.error.message}
                  </span>
                )}
              </Field>
            )}
          />
          <Controller
            name="destination"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field>
                <FieldLabel>Destino</FieldLabel>
                <Input placeholder="Bodega norte" {...field} />
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
              name="departureTime"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field>
                  <FieldLabel>Hora de salida</FieldLabel>
                  <Input type="time" {...field} />
                  {fieldState.error && (
                    <span className="text-sm text-red-500">
                      {fieldState.error.message}
                    </span>
                  )}
                </Field>
              )}
            />
            <Controller
              name="arrivalTime"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field>
                  <FieldLabel>Hora de llegada</FieldLabel>
                  <Input type="time" {...field} />
                  {fieldState.error && (
                    <span className="text-sm text-red-500">
                      {fieldState.error.message}
                    </span>
                  )}
                </Field>
              )}
            />
          </div>
          <Controller
            name="observations"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field>
                <FieldLabel>Observaciones (opcional)</FieldLabel>
                <Textarea
                  placeholder="Novedades del recorrido"
                  {...field}
                  value={field.value ?? ""}
                />
                {fieldState.error && (
                  <span className="text-sm text-red-500">
                    {fieldState.error.message}
                  </span>
                )}
              </Field>
            )}
          />
        </form>

        <DialogFooter>
          <DialogClose render={<Button variant="outline" />}>
            Cancelar
          </DialogClose>
          <Button type="submit" form="form-displacement" disabled={isPending}>
            {isPending ? (
              <Spinner />
            ) : isEdit ? (
              "Guardar cambios"
            ) : (
              "Agregar desplazamiento"
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
