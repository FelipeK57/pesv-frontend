import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import { VehiclesList } from "../components/VehiclesList"
import { VehicleFormDialog } from "../components/VehicleFormDialog"

export function VehiclesPage() {
  return (
    <main className="mx-auto flex max-w-2xl flex-col">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Mis vehículos</h1>
        <VehicleFormDialog
          trigger={
            <Button>
              <Plus /> Agregar vehículo
            </Button>
          }
        />
      </div>
      <p className="mt-2 text-sm text-muted-foreground">
        Vehículos registrados para tus inspecciones y desplazamientos.
      </p>
      <VehiclesList />
    </main>
  )
}
