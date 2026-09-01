import { useState, type ReactElement } from "react"
import { LoaderCircle } from "lucide-react"

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
import { toast } from "@/components/ui/toast"

import { useDeleteVehicle } from "../hooks/useVehicleMutations"
import type { Vehicle } from "../types"

interface DeleteVehicleDialogProps {
  vehicle: Vehicle
  /** Debe ser un único elemento: `DialogTrigger` lo clona vía `render`. */
  trigger: ReactElement
}

export function DeleteVehicleDialog({
  vehicle,
  trigger,
}: DeleteVehicleDialogProps) {
  const [open, setOpen] = useState(false)
  const { mutate, isPending } = useDeleteVehicle(vehicle.id)

  const onDelete = () => {
    mutate(undefined, {
      onSuccess: () => {
        setOpen(false)
        toast.add({ type: "success", title: "Vehículo eliminado" })
      },
      onError: (error) => {
        toast.add({ type: "error", title: error.message })
      },
    })
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger render={trigger} />
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Eliminar vehículo</DialogTitle>
          <DialogDescription>
            ¿Seguro que deseas eliminar el {vehicle.brand} {vehicle.model} con
            placa {vehicle.plate}? Esta acción no se puede deshacer.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <DialogClose render={<Button variant="outline" />}>
            Cancelar
          </DialogClose>
          <Button variant="destructive" onClick={onDelete} disabled={isPending}>
            {isPending ? (
              <LoaderCircle className="animate-spin" />
            ) : (
              "Eliminar"
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
