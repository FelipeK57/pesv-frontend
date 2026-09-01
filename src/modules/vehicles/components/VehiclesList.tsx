import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { useVehicles } from "../hooks/useVehicles"
import { Car, LoaderCircle, Motorbike, Pencil, Trash } from "lucide-react"
import { Button } from "@/components/ui/button"
import type { Vehicle } from "../types"
import { VehicleFormDialog } from "./VehicleFormDialog"
import { DeleteVehicleDialog } from "./DeleteVehicleDialog"

export function VehiclesList() {
  const { data: vehicles, isLoading } = useVehicles()

  if (isLoading) {
    return (
      <div className="mt-6 flex flex-col items-center justify-center text-muted-foreground">
        <LoaderCircle className="animate-spin" />
      </div>
    )
  }

  return (
    <div className="mt-6 grid gap-4 sm:grid-cols-2">
      {vehicles?.length === 0 ? (
        <div className="col-span-2 text-center text-muted-foreground">
          No se encontraron vehículos.
        </div>
      ) : (
        vehicles?.map((vehicle: Vehicle) => (
          <Card key={vehicle.id}>
            <CardContent className="flex gap-2">
              <div className="w-fit rounded-lg bg-muted p-2 text-muted-foreground">
                {vehicle.vehicleType === "CAR" ? <Car /> : <Motorbike />}
              </div>
              <div>
                <p className="text-sm font-medium">
                  {vehicle.brand} {vehicle.model}
                </p>
                <p className="text-xs text-muted-foreground">{vehicle.plate}</p>
              </div>
            </CardContent>
            <CardFooter className="flex justify-end">
              <VehicleFormDialog
                vehicle={vehicle}
                trigger={
                  <Button size="sm" variant="outline">
                    <Pencil /> Editar
                  </Button>
                }
              />
              <DeleteVehicleDialog
                vehicle={vehicle}
                trigger={
                  <Button size="sm" variant="destructive" className="ml-2">
                    <Trash /> Eliminar
                  </Button>
                }
              />
            </CardFooter>
          </Card>
        ))
      )}
    </div>
  )
}
