import { Link } from "react-router"
import { EyeIcon } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import type { EmployeeInspectionStats } from "@/modules/inspections/types"

interface EmployeeStatsTableProps {
  stats: EmployeeInspectionStats[]
}

export function EmployeeStatsTable({ stats }: EmployeeStatsTableProps) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Trabajador</TableHead>
          <TableHead className="text-right">Inspecciones</TableHead>
          <TableHead className="text-right">Desplazamientos</TableHead>
          <TableHead>
            <span className="sr-only">Acciones</span>
          </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {stats.length === 0 ? (
          <TableRow>
            <TableCell
              colSpan={4}
              className="h-24 text-center text-muted-foreground"
            >
              No hay actividad registrada por el equipo.
            </TableCell>
          </TableRow>
        ) : (
          stats.map((row) => (
            <TableRow key={row.employeeId}>
              <TableCell className="font-medium">
                {row.name} {row.lastName}
              </TableCell>
              <TableCell className="text-right">{row.inspections}</TableCell>
              <TableCell className="text-right">{row.displacements}</TableCell>
              <TableCell>
                <div className="flex justify-end">
                  <Button
                    variant="outline"
                    size="icon-sm"
                    aria-label={`Ver inspecciones de ${row.name} ${row.lastName}`}
                    nativeButton={false}
                    render={
                      <Link
                        to={`/supervisor/employees/${row.employeeId}/inspections`}
                      />
                    }
                  >
                    <EyeIcon />
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))
        )}
      </TableBody>
    </Table>
  )
}
