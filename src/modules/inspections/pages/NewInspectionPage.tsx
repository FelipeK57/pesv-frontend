import { useRef, useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"

import { toast } from "@/components/ui/toast"
import type { Vehicle, VehicleType } from "@/modules/vehicles/types"

import { BorrowedVehicleStep } from "../components/BorrowedVehicleStep"
import { ChecklistStep } from "../components/ChecklistStep"
import { NoVehicleStep } from "../components/NoVehicleStep"
import { OwnVehicleStep } from "../components/OwnVehicleStep"
import { TransportStep } from "../components/TransportStep"
import {
  InspectionSuccess,
  type InspectionSummary,
} from "../components/InspectionSuccess"
import { useCreateInspection } from "../hooks/useCreateInspection"
import { NO_VEHICLE_ITEM, getChecklistItems } from "../lib/checklist-items"
import {
  VEHICLE_TYPE_LABELS,
  getTransportOption,
} from "../lib/transport-options"
import {
  borrowedVehicleSchema,
  checklistFormSchema,
  type BorrowedVehicleInput,
  type ChecklistFormInput,
  type ChecklistFormValues,
} from "../schemas/inspection-form.schemas"
import type { InspectionItemInput } from "../types"

type Step = "transport" | "vehicle" | "checklist"

/** El backend puede responder la fecha como Date serializada o como texto. */
function toISODate(value: unknown): string {
  if (typeof value === "string" && value.length >= 10) return value.slice(0, 10)
  const date = value instanceof Date ? value : new Date()
  const offset = date.getTimezoneOffset() * 60_000
  return new Date(date.getTime() - offset).toISOString().slice(0, 10)
}

function buildChecklistDefaults(vehicleType: VehicleType): ChecklistFormInput {
  return {
    mileage: undefined as unknown as number,
    items: getChecklistItems(vehicleType).map((itemName) => ({
      itemName,
      status: null,
      observation: "",
    })),
  }
}

export function NewInspectionPage() {
  const [step, setStep] = useState<Step>("transport")
  const [optionId, setOptionId] = useState<string | null>(null)
  const [vehicle, setVehicle] = useState<Vehicle | null>(null)
  const [summary, setSummary] = useState<InspectionSummary | null>(null)

  const option = getTransportOption(optionId)
  const createInspection = useCreateInspection()

  const borrowedForm = useForm<BorrowedVehicleInput>({
    resolver: zodResolver(borrowedVehicleSchema),
    defaultValues: { plate: "", brand: "", model: "" },
  })

  const checklistForm = useForm<
    ChecklistFormInput,
    unknown,
    ChecklistFormValues
  >({
    resolver: zodResolver(checklistFormSchema),
    defaultValues: buildChecklistDefaults("CAR"),
  })

  /**
   * Tipo de vehículo con el que se construyó el checklist actual: si el usuario
   * regresa y cambia de carro a moto hay que rehacer la lista de ítems.
   */
  const checklistVehicleType = useRef<VehicleType>("CAR")

  const syncChecklist = (vehicleType: VehicleType) => {
    if (checklistVehicleType.current === vehicleType) return
    checklistVehicleType.current = vehicleType
    checklistForm.reset(buildChecklistDefaults(vehicleType))
  }

  /** "Yamaha XTZ 125 · ABC123" para propio, "Toyota Corolla · ABC123" para prestado. */
  const describeVehicle = () => {
    if (!option) return null
    if (option.resolution === "own" && vehicle) {
      return `${vehicle.brand} ${vehicle.model} · ${vehicle.plate}`
    }
    if (option.resolution === "borrowed") {
      const { plate, brand, model } = borrowedForm.getValues()
      return `${brand} ${model} · ${plate}`
    }
    return null
  }

  const vehicleContext = () => {
    if (!option?.vehicleType) return ""
    const type = VEHICLE_TYPE_LABELS[option.vehicleType]
    if (option.resolution === "borrowed") {
      return `${type} · ${borrowedForm.getValues("plate")}`
    }
    return vehicle
      ? `${type} · ${vehicle.brand} ${vehicle.model} · ${vehicle.plate}`
      : type
  }

  const save = (
    items: InspectionItemInput[],
    mileage: number | null,
    failedCount: number | null
  ) => {
    // `isPending` bloquea también el doble clic sobre el botón de guardar.
    if (!option || createInspection.isPending) return

    createInspection.mutate(
      {
        transportType: option.transportType,
        vehicleId: option.resolution === "own" ? vehicle?.id : null,
        borrowedPlate:
          option.resolution === "borrowed"
            ? borrowedForm.getValues("plate")
            : null,
        borrowedBrand:
          option.resolution === "borrowed"
            ? borrowedForm.getValues("brand")
            : null,
        borrowedModel:
          option.resolution === "borrowed"
            ? borrowedForm.getValues("model")
            : null,
        vehicleData: mileage === null ? null : { mileage },
        items,
      },
      {
        onSuccess: (inspection) => {
          setSummary({
            date: toISODate(inspection?.inspectionDate),
            transportLabel: option.label,
            vehicleLabel: describeVehicle(),
            failedCount,
          })
        },
        onError: (error) => {
          toast.add({ type: "error", title: error.message })
        },
      }
    )
  }

  const handleChecklistSubmit = (data: ChecklistFormValues) => {
    const items: InspectionItemInput[] = data.items.map((item) => ({
      itemName: item.itemName,
      status: item.status!,
      observation: item.status === "FAIL" ? item.observation : null,
    }))

    const failedCount = data.items.filter(
      (item) => item.status === "FAIL"
    ).length

    save(items, data.mileage, failedCount)
  }

  if (summary) {
    return (
      <main className="mx-auto w-full max-w-2xl px-4 py-6">
        <InspectionSuccess {...summary} />
      </main>
    )
  }

  return (
    <main className="mx-auto w-full max-w-2xl px-4 py-6">
      {step === "transport" && (
        <TransportStep
          selectedId={optionId}
          onSelect={setOptionId}
          onContinue={() => {
            const next = getTransportOption(optionId)
            if (!next) return
            if (next.vehicleType) syncChecklist(next.vehicleType)
            setStep("vehicle")
          }}
        />
      )}

      {step === "vehicle" && option?.resolution === "own" && (
        <OwnVehicleStep
          vehicleType={option.vehicleType!}
          vehicleId={vehicle?.id ?? null}
          onSelect={setVehicle}
          onBack={() => setStep("transport")}
          onContinue={() => setStep("checklist")}
        />
      )}

      {step === "vehicle" && option?.resolution === "borrowed" && (
        <BorrowedVehicleStep
          vehicleType={option.vehicleType!}
          form={borrowedForm}
          onBack={() => setStep("transport")}
          onContinue={() => setStep("checklist")}
        />
      )}

      {step === "vehicle" && option?.resolution === "none" && (
        <NoVehicleStep
          option={option}
          isSaving={createInspection.isPending}
          onBack={() => setStep("transport")}
          onSave={() =>
            save(
              [
                {
                  itemName: NO_VEHICLE_ITEM,
                  status: "PASS",
                  observation: option.label,
                },
              ],
              null,
              null
            )
          }
        />
      )}

      {step === "checklist" && option && (
        <ChecklistStep
          vehicleContext={vehicleContext()}
          form={checklistForm}
          isSaving={createInspection.isPending}
          onBack={() => setStep("vehicle")}
          onSubmit={handleChecklistSubmit}
        />
      )}
    </main>
  )
}
