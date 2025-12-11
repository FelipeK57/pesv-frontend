import { Button, Card, CardBody } from "@heroui/react";
import {
  Car,
  ChevronRight,
  ClipboardCheck,
  MapPin,
  Wrench,
} from "lucide-react";

const routes = [
  {
    name: "Registrar vehículo",
    description: "Añade o gestiona tus vehiculos",
    icon: Car,
    path: "/vehicles",
    color: "bg-blue-500",
  },
  {
    name: "Chequeo preoperacional",
    description: "Realiza la inspección diaria",
    icon: ClipboardCheck,
    path: "/checklist",
    color: "bg-blue-600",
  },
  {
    name: "Registrar ruta",
    description: "Documenta tus desplazamientos",
    icon: MapPin,
    path: "/routes",
    color: "bg-blue-700",
  },
  {
    name: "Registrar mantenimiento",
    description: "Registra servicios y reparaciones",
    icon: Wrench,
    path: "/maintenance",
    color: "bg-blue-800",
  },
];

export const Home = () => {
  return (
    <main className="flex flex-col gap-4">
      <h2>Resumen rápido</h2>
      <article className="flex justify-between gap-4 w-full">
        <Card
          classNames={{
            base: "w-full shadow-sm border border-default-200 p-2",
          }}
        >
          <CardBody>
            <p className="text-default-700 text-xs">Vehiculos</p>
            <p className="text-2xl mt-2 font-semibold">2</p>
          </CardBody>
        </Card>
        <Card
          classNames={{
            base: "w-full shadow-sm border border-default-200 p-2",
          }}
        >
          <CardBody>
            <p className="text-default-700 text-xs">Chequeos este mes</p>
            <p className="text-2xl mt-2 font-semibold">12</p>
          </CardBody>
        </Card>
      </article>
      <h2>Acciones</h2>
      {routes.map((route) => (
        <Card
          classNames={{
            base: "shadow-sm p-2 border border-default-200 h-fit",
          }}
        >
          <CardBody className="flex flex-row gap-4">
            <div
              className={`grid place-content-center rounded-xl ${route.color} size-12`}
            >
              <route.icon className="text-white size-6" />
            </div>
            <div className="flex flex-1 flex-col">
              <h2 className="font-semibold">{route.name}</h2>
              <p className="max-w-36 text-sm text-default-600">
                {route.description}
              </p>
            </div>
            <Button isIconOnly variant="light">
              <ChevronRight />
            </Button>
          </CardBody>
        </Card>
      ))}
    </main>
  );
};
