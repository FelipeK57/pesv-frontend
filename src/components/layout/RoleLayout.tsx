import { Navigate, Outlet } from "react-router"
import { homeRouteForRole } from "@/modules/auth/lib/auth.routes"
import { useAuthUser } from "@/modules/auth/store/auth.store"
import type { Role } from "@/modules/auth/types/auth.types"

interface RoleLayoutProps {
  allowedRoles: Role[]
}

/**
 * Restringe un grupo de rutas a ciertos roles. Debe ir dentro de
 * ProtectedLayout, que es quien garantiza que hay sesión válida.
 */
export function RoleLayout({ allowedRoles }: RoleLayoutProps) {
  const user = useAuthUser()

  if (!user) return null

  // Rol no autorizado: lo devolvemos a su propia pantalla de inicio.
  if (!allowedRoles.includes(user.role as Role)) {
    return <Navigate to={homeRouteForRole(user.role)} replace />
  }

  return <Outlet />
}
