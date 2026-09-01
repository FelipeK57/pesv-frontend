import { useState, type ReactElement } from "react"

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
import { Spinner } from "@/components/ui/spinner"
import { toast } from "@/components/ui/toast"

import { useDeleteDisplacement } from "../hooks/useDisplacementMutations"
import type { Displacement } from "../types"

interface DeleteDisplacementDialogProps {
  displacement: Displacement
  inspectionId: number
  /** Debe ser un único elemento: `DialogTrigger` lo clona vía `render`. */
  trigger: ReactElement
}

export function DeleteDisplacementDialog({
  displacement,
  inspectionId,
  trigger,
}: DeleteDisplacementDialogProps) {
  const [open, setOpen] = useState(false)
  const { mutate, isPending } = useDeleteDisplacement(
    displacement.id,
    inspectionId
  )

  const onDelete = () => {
    mutate(undefined, {
      onSuccess: () => {
        setOpen(false)
        toast.add({ type: "success", title: "Desplazamiento eliminado" })
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
          <DialogTitle>Eliminar desplazamiento</DialogTitle>
          <DialogDescription>
            ¿Seguro que deseas eliminar el recorrido de {displacement.origin} a{" "}
            {displacement.destination}? Esta acción no se puede deshacer.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <DialogClose render={<Button variant="outline" />}>
            Cancelar
          </DialogClose>
          <Button variant="destructive" onClick={onDelete} disabled={isPending}>
            {isPending ? <Spinner /> : "Eliminar"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
