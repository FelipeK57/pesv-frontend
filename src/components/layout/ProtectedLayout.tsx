import { useEffect } from "react"
import { Navigate, Outlet, useLocation } from "react-router"
import { hasValidSession, useAuthStore } from "@/modules/auth/store/auth.store"

export function ProtectedLayout() {
  const location = useLocation()
  const checkSession = useAuthStore((state) => state.checkSession)

  // El token puede haber expirado mientras la app estaba abierta, o haber
  // cambiado en otra pestaña: sincronizamos el store en cada cambio de ruta.
  useEffect(() => {
    checkSession()
  }, [checkSession, location.pathname])

  if (!hasValidSession()) {
    return <Navigate to="/" replace state={{ from: location.pathname }} />
  }

  return <Outlet />
}
