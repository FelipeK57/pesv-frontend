import { ExternalLinkIcon, LoaderCircleIcon, PlusIcon } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Field, FieldLabel } from "@/components/ui/field"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { useVehicles } from "@/modules/vehicles/hooks/useVehicles"
import type { Vehicle, VehicleType } from "@/modules/vehicles/types"

import { VEHICLE_TYPE_LABELS } from "../lib/transport-options"
import { StepHeader } from "./StepHeader"

/** "Yamaha XTZ 125 - ABC123 (Moto)" */
function formatVehicleOption(vehicle: Vehicle) {
  return `${vehicle.brand} ${vehicle.model} - ${vehicle.plate} (${VEHICLE_TYPE_LABELS[vehicle.vehicleType]})`
}

interface OwnVehicleStepProps {
  vehicleType: VehicleType
  vehicleId: number | null
  onSelect: (vehicle: Vehicle) => void
  onBack: () => void
  onContinue: () => void
}

export function OwnVehicleStep({
  vehicleType,
  vehicleId,
  onSelect,
  onBack,
  onContinue,
}: OwnVehicleStepProps) {
  const { data, isLoading, isError, refetch, isFetching } = useVehicles()

  const vehicles: Vehicle[] = (data ?? []).filter(
    (vehicle: Vehicle) => vehicle.active && vehicle.vehicleType === vehicleType
  )
  const selected = vehicles.find((vehicle) => vehicle.id === vehicleId) ?? null

  return (
    <div className="flex flex-col gap-6">
      <StepHeader
        step={2}
        totalSteps={3}
        onBack={onBack}
        title="Selecciona tu vehículo"
        description={`Mostramos tus ${VEHICLE_TYPE_LABELS[vehicleType].toLowerCase()}s activas registradas.`}
      />

      {isLoading ? (
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <LoaderCircleIcon
            className="size-4 animate-spin"
            aria-hidden="true"
          />
          Cargando tus vehículos...
        </div>
      ) : isError ? (
        <div className="flex flex-col items-start gap-3 rounded-xl border border-destructive/40 bg-destructive/5 p-4">
          <p className="text-sm">No fue posible cargar la información.</p>
          <Button
            type="button"
            variant="outline"
            size="sm"
            disabled={isFetching}
            onClick={() => refetch()}
          >
            Reintentar
          </Button>
        </div>
      ) : vehicles.length === 0 ? (
        <div className="flex flex-col items-start gap-3 rounded-xl border border-dashed p-6">
          <p className="text-sm text-muted-foreground">
            No tienes vehículos registrados.
          </p>
          <RegisterVehicleLink />
        </div>
      ) : (
        <div className="flex flex-col gap-4">
          <Field>
            <FieldLabel>Vehículo</FieldLabel>
            <Select
              value={vehicleId}
              onValueChange={(value) => {
                const vehicle = vehicles.find((item) => item.id === value)
                if (vehicle) onSelect(vehicle)
              }}
            >
              <SelectTrigger className="w-full">
                <SelectValue>
                  {() =>
                    selected
                      ? formatVehicleOption(selected)
                      : "Selecciona un vehículo"
                  }
                </SelectValue>
              </SelectTrigger>
              <SelectContent>
                {vehicles.map((vehicle) => (
                  <SelectItem key={vehicle.id} value={vehicle.id}>
                    {formatVehicleOption(vehicle)}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </Field>

          <div className="flex flex-col items-start gap-2 rounded-xl bg-muted/50 p-4">
            <p className="text-sm font-medium">¿No aparece tu vehículo?</p>
            <RegisterVehicleLink />
          </div>
        </div>
      )}

      <Button
        type="button"
        className="w-full sm:w-auto sm:self-end"
        disabled={!selected}
        onClick={onContinue}
      >
        Continuar
      </Button>
    </div>
  )
}

/**
 * El registro de vehículos vive en su propia pantalla: se abre en otra pestaña
 * para no perder el avance de la inspección.
 */
function RegisterVehicleLink() {
  return (
    <Button
      variant="outline"
      size="sm"
      nativeButton={false}
      render={<a href="/employees/vehicles" target="_blank" rel="noreferrer" />}
    >
      <PlusIcon /> Registrar vehículo
      <ExternalLinkIcon className="size-3.5 opacity-70" />
    </Button>
  )
}
