import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import { Link } from "react-router"
import { VehiclesList } from "../components/VehiclesList"

export function VehiclesPage() {
  return (
    <main className="mx-auto flex max-w-2xl flex-col">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Mis vehículos</h1>
        <Button render={<Link to="new" />} nativeButton={false}>
          <Plus /> Agregar vehículo
        </Button>
      </div>
      <p className="mt-2 text-sm text-muted-foreground">
        Vehículos registrados para tus inspecciones y desplazamientos.
      </p>
      <VehiclesList />
    </main>
  )
}
