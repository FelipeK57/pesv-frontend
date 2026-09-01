import { useState, type ReactNode } from "react"
import { Controller, useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"

import { Button } from "@/components/ui/button"
import { Spinner } from "@/components/ui/spinner"
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
import { toast } from "@/components/ui/toast"

import { vehicleSchema, type VehicleInput } from "../schemas/vehicles.schemas"
import {
  useCreateVehicle,
  useUpdateVehicle,
} from "../hooks/useVehicleMutations"
import type { Vehicle } from "../types"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

const vehiclesTypes = [
  { value: "CAR", label: "Automóvil" },
  { value: "MOTORCYCLE", label: "Motocicleta" },
]

const emptyVehicle: VehicleInput = {
  plate: "",
  vehicleType: "CAR",
  brand: "",
  model: "",
  year: new Date().getFullYear(),
  cc: 0,
}

function toFormValues(vehicle?: Vehicle): VehicleInput {
  if (!vehicle) return emptyVehicle
  return {
    plate: vehicle.plate,
    vehicleType: vehicle.vehicleType,
    brand: vehicle.brand,
    model: vehicle.model,
    year: vehicle.year,
    cc: vehicle.cc,
  }
}

interface VehicleFormDialogProps {
  /** Si se recibe un vehículo el diálogo funciona en modo edición. */
  vehicle?: Vehicle
  trigger: ReactNode
}

export function VehicleFormDialog({
  vehicle,
  trigger,
}: VehicleFormDialogProps) {
  const [open, setOpen] = useState(false)
  const isEdit = Boolean(vehicle)

  const createVehicle = useCreateVehicle()
  const updateVehicle = useUpdateVehicle(vehicle?.id ?? 0)
  const { mutate, isPending } = isEdit ? updateVehicle : createVehicle

  const form = useForm<VehicleInput>({
    resolver: zodResolver(vehicleSchema),
    defaultValues: toFormValues(vehicle),
  })

  const handleOpenChange = (nextOpen: boolean) => {
    setOpen(nextOpen)
    if (nextOpen) form.reset(toFormValues(vehicle))
  }

  const onSubmit = (data: VehicleInput) => {
    mutate(data, {
      onSuccess: () => {
        setOpen(false)
        toast.add({
          type: "success",
          title: isEdit ? "Vehículo actualizado" : "Vehículo creado",
        })
      },
      onError: (error) => {
        toast.add({ type: "error", title: error.message })
      },
    })
  }

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger>{trigger}</DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>
            {isEdit ? "Editar vehículo" : "Agregar vehículo"}
          </DialogTitle>
          <DialogDescription>
            {isEdit
              ? "Actualiza la información de tu vehículo."
              : "Registra un vehículo para tus inspecciones y desplazamientos."}
          </DialogDescription>
        </DialogHeader>

        <form
          id="form-vehicle"
          className="space-y-4"
          onSubmit={form.handleSubmit(onSubmit)}
        >
          <Controller
            name="plate"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field>
                <FieldLabel>Placa</FieldLabel>
                <Input placeholder="ABC123" {...field} />
                {fieldState.error && (
                  <span className="text-sm text-red-500">
                    {fieldState.error.message}
                  </span>
                )}
              </Field>
            )}
          />
          <Controller
            name="vehicleType"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field>
                <FieldLabel>Tipo de vehículo</FieldLabel>
                <Select value={field.value} onValueChange={field.onChange}>
                  <SelectTrigger>
                    <SelectValue>
                      {() =>
                        vehiclesTypes.find((type) => type.value === field.value)
                          ?.label ?? "Selecciona un tipo de vehículo"
                      }
                    </SelectValue>
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      {vehiclesTypes.map((type) => (
                        <SelectItem key={type.value} value={type.value}>
                          {type.label}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
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
                  <Input placeholder="Renault" {...field} />
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
                  <Input placeholder="Logan" {...field} />
                  {fieldState.error && (
                    <span className="text-sm text-red-500">
                      {fieldState.error.message}
                    </span>
                  )}
                </Field>
              )}
            />
            <Controller
              name="year"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field>
                  <FieldLabel>Año</FieldLabel>
                  <Input
                    type="number"
                    placeholder="2020"
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
            <Controller
              name="cc"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field>
                  <FieldLabel>Cilindraje (cc)</FieldLabel>
                  <Input
                    type="number"
                    placeholder="1600"
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
          </div>
        </form>

        <DialogFooter>
          <DialogClose render={<Button variant="outline" />}>
            Cancelar
          </DialogClose>
          <Button type="submit" form="form-vehicle" disabled={isPending}>
            {isPending ? (
              <Spinner />
            ) : isEdit ? (
              "Guardar cambios"
            ) : (
              "Agregar vehículo"
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
