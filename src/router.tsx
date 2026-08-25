import { BrowserRouter, Route, Routes } from "react-router"
import { LoginPage } from "./modules/auth/pages/LoginPage"

export function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<LoginPage />} />
        <Route path="employee" element={<h1>Inicio de trabajadores</h1>} />
      </Routes>
    </BrowserRouter>
  )
}
