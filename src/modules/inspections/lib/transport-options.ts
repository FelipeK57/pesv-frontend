import {
  BikeIcon,
  BusIcon,
  CarFrontIcon,
  CarIcon,
  CarTaxiFrontIcon,
  // EllipsisIcon,
  FootprintsIcon,
  MotorbikeIcon,
  SmartphoneIcon,
  type LucideIcon,
} from "lucide-react"

import type { VehicleType } from "@/modules/vehicles/types"
import type { TransportType } from "../types"

/**
 * Modo en que se resuelve el vehículo del paso 2:
 * - `own`: se selecciona un vehículo ya registrado por el trabajador.
 * - `borrowed`: se digitan placa, marca y modelo del vehículo prestado.
 * - `none`: no hay vehículo, por lo tanto tampoco checklist.
 */
export type VehicleResolution = "own" | "borrowed" | "none"

export interface TransportOption {
  /** Identificador de la tarjeta (no viaja al backend). */
  id: string
  label: string
  icon: LucideIcon
  /** Valor que se persiste en `inspection.transport_type`. */
  transportType: TransportType
  resolution: VehicleResolution
  /** Solo aplica cuando la opción requiere vehículo. */
  vehicleType?: VehicleType
}

export const TRANSPORT_OPTIONS: TransportOption[] = [
  {
    id: "OWN_CAR",
    label: "Carro propio",
    icon: CarFrontIcon,
    transportType: "OWN_VEHICLE",
    resolution: "own",
    vehicleType: "CAR",
  },
  {
    id: "OWN_MOTORCYCLE",
    label: "Moto propia",
    icon: MotorbikeIcon,
    transportType: "OWN_VEHICLE",
    resolution: "own",
    vehicleType: "MOTORCYCLE",
  },
  {
    id: "BORROWED_CAR",
    label: "Carro prestado",
    icon: CarIcon,
    transportType: "BORROWED_VEHICLE",
    resolution: "borrowed",
    vehicleType: "CAR",
  },
  {
    id: "BORROWED_MOTORCYCLE",
    label: "Moto prestada",
    icon: MotorbikeIcon,
    transportType: "BORROWED_VEHICLE",
    resolution: "borrowed",
    vehicleType: "MOTORCYCLE",
  },
  {
    id: "BUS",
    label: "Bus",
    icon: BusIcon,
    transportType: "BUS",
    resolution: "none",
  },
  {
    id: "TAXI",
    label: "Taxi",
    icon: CarTaxiFrontIcon,
    transportType: "TAXI",
    resolution: "none",
  },
  {
    id: "RIDESHARE",
    label: "Vehículo de plataforma",
    icon: SmartphoneIcon,
    transportType: "RIDESHARE",
    resolution: "none",
  },
  {
    id: "BICYCLE",
    label: "Bicicleta",
    icon: BikeIcon,
    transportType: "BICYCLE",
    resolution: "none",
  },
  {
    id: "WALKING",
    label: "Caminando",
    icon: FootprintsIcon,
    transportType: "WALKING",
    resolution: "none",
  },
  // {
  //   id: "OTHER",
  //   label: "Otro",
  //   icon: EllipsisIcon,
  //   transportType: "OTHER",
  //   resolution: "none",
  // },
]

export function getTransportOption(id: string | null) {
  return TRANSPORT_OPTIONS.find((option) => option.id === id) ?? null
}

export const VEHICLE_TYPE_LABELS: Record<VehicleType, string> = {
  CAR: "Carro",
  MOTORCYCLE: "Moto",
}

/** Etiqueta para mostrar el `transport_type` almacenado en la inspección. */
export const TRANSPORT_TYPE_LABELS: Record<TransportType, string> = {
  OWN_VEHICLE: "Vehículo propio",
  BORROWED_VEHICLE: "Vehículo prestado",
  BUS: "Bus",
  TAXI: "Taxi",
  RIDESHARE: "Vehículo de plataforma",
  BICYCLE: "Bicicleta",
  WALKING: "Caminando",
  OTHER: "Otro",
}
