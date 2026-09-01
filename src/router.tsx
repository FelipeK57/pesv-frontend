import { BrowserRouter, Route, Routes } from "react-router"
import { AppLayout } from "./components/layout/AppLayout"
import { ProtectedLayout } from "./components/layout/ProtectedLayout"
import { RoleLayout } from "./components/layout/RoleLayout"
import { LoginPage } from "./modules/auth/pages/LoginPage"
import { EmployeeHomePage } from "./modules/home/employee/pages/EmployeeHomePage"
import { SupervisorHomePage } from "./modules/home/supervisor/pages/SupervisorHomePage"
import { VehiclesPage } from "./modules/vehicles/pages/VehiclesPage"
import { NewInspectionPage } from "./modules/inspections/pages/NewInspectionPage"
import { InspectionsPage } from "./modules/inspections/pages/InspectionsPage"
import { InspectionDetailPage } from "./modules/inspections/pages/InspectionDetailPage"

export function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<LoginPage />} />
        <Route element={<ProtectedLayout />}>
          <Route element={<AppLayout />}>
            <Route element={<RoleLayout allowedRoles={["Trabajador"]} />}>
              <Route path="employees" element={<EmployeeHomePage />} />
              <Route path="employees/vehicles" element={<VehiclesPage />} />
              <Route
                path="employees/inspections"
                element={<InspectionsPage />}
              />
              <Route
                path="employees/inspections/new"
                element={<NewInspectionPage />}
              />
              <Route
                path="employees/inspections/:id"
                element={<InspectionDetailPage />}
              />
            </Route>
            <Route
              element={
                <RoleLayout allowedRoles={["Supervisor", "Administrador"]} />
              }
            >
              <Route path="supervisor" element={<SupervisorHomePage />} />
            </Route>
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
