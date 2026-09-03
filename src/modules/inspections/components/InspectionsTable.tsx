import { useCallback, useMemo } from "react"
import { Link } from "react-router"
import {
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
  type ColumnDef,
} from "@tanstack/react-table"
import { EyeIcon } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { useVehicles } from "@/modules/vehicles/hooks/useVehicles"
import type { Vehicle } from "@/modules/vehicles/types"

import { isSyntheticItem } from "../lib/checklist-items"
import {
  describeInspectionVehicle,
  inspectionDateKey,
} from "../lib/inspection-format"
import { TRANSPORT_TYPE_LABELS } from "../lib/transport-options"
import type { InspectionDetail } from "../types"

function useColumns(
  resolveVehicle: (vehicleId: number) => Vehicle | undefined,
  basePath: string
) {
  return useMemo<ColumnDef<InspectionDetail>[]>(
    () => [
      {
        id: "date",
        header: "Fecha",
        accessorFn: (row) => inspectionDateKey(row.inspectionDate),
      },
      {
        id: "transport",
        header: "Medio de transporte",
        accessorFn: (row) => TRANSPORT_TYPE_LABELS[row.transportType],
      },
      {
        id: "vehicle",
        header: "Vehículo",
        accessorFn: (row) => describeInspectionVehicle(row, resolveVehicle),
      },
      {
        id: "mileage",
        header: "Kilometraje",
        accessorFn: (row) => row.vehicleData?.mileage ?? null,
        cell: ({ getValue }) => {
          const mileage = getValue<number | null>()
          return mileage == null ? "—" : `${mileage.toLocaleString("es-CO")} km`
        },
      },
      {
        id: "result",
        header: "Resultado",
        // `items` puede no venir en el listado: en ese caso no hay resultado que mostrar.
        accessorFn: (row) =>
          row.items
            ? row.items.filter(
                (item) =>
                  item.status === "FAIL" && !isSyntheticItem(item.itemName)
              ).length
            : null,
        cell: ({ getValue }) => {
          const failures = getValue<number | null>()
          if (failures === null) return "—"
          return (
            <Badge variant={failures > 0 ? "destructive" : "secondary"}>
              {failures === 0
                ? "Sin novedades"
                : failures === 1
                  ? "1 novedad"
                  : `${failures} novedades`}
            </Badge>
          )
        },
      },
      {
        id: "actions",
        header: () => <span className="sr-only">Acciones</span>,
        cell: ({ row }) => (
          <div className="flex justify-end">
            <Button
              variant="outline"
              size="icon-sm"
              nativeButton={false}
              render={<Link to={`${basePath}/${row.original.id}`} />}
            >
              <EyeIcon />
            </Button>
          </div>
        ),
      },
    ],
    [resolveVehicle, basePath]
  )
}

interface InspectionsTableProps {
  inspections: InspectionDetail[]
  /** Ruta base para el enlace de detalle. Permite reutilizar la tabla en la vista de supervisor. */
  basePath?: string
  emptyMessage?: string
}

export function InspectionsTable({
  inspections,
  basePath = "/employees/inspections",
  emptyMessage = "Aún no has registrado inspecciones.",
}: InspectionsTableProps) {
  // El listado puede traer solo `vehicleId`: resolvemos el nombre con los
  // vehículos del trabajador, que ya están cacheados por react-query.
  const { data: vehicles } = useVehicles()
  const resolveVehicle = useCallback(
    (vehicleId: number) =>
      (vehicles as Vehicle[] | undefined)?.find(
        (vehicle) => vehicle.id === vehicleId
      ),
    [vehicles]
  )

  const table = useReactTable({
    data: inspections,
    columns: useColumns(resolveVehicle, basePath),
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    initialState: { pagination: { pageSize: 10 } },
  })

  return (
    <div className="flex flex-col gap-4">
      <Table>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <TableHead key={header.id}>
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                </TableHead>
              ))}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows.length === 0 ? (
            <TableRow>
              <TableCell
                colSpan={table.getAllColumns().length}
                className="h-24 text-center text-muted-foreground"
              >
                {emptyMessage}
              </TableCell>
            </TableRow>
          ) : (
            table.getRowModel().rows.map((row) => (
              <TableRow key={row.id}>
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  )
}
