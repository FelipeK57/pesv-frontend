import { useQueryClient } from "@tanstack/react-query"
import { LogOut } from "lucide-react"
import { Link, useNavigate } from "react-router"

import { Button } from "@/components/ui/button"
import { useAuthStore, useAuthUser } from "@/modules/auth/store/auth.store"

function getInitials(name: string) {
  return name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase())
    .join("")
}

export function AppHeader() {
  const user = useAuthUser()
  const logout = useAuthStore((state) => state.logout)
  const queryClient = useQueryClient()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    // Evita que la siguiente sesión vea datos cacheados de este usuario.
    queryClient.clear()
    navigate("/", { replace: true })
  }

  return (
    <header className="sticky top-0 z-50 flex items-center justify-between border-b bg-background/30 px-6 py-4 backdrop-blur-sm">
      <div className="flex items-center gap-8">
        <Link to="/" className="font-semibold">
          PESV
        </Link>
        <div className="hidden sm:block">
          {user?.role === "Trabajador" && (
            <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
              <Link
                to="/employees"
                className="transition-colors hover:text-foreground"
              >
                Inicio
              </Link>
              <Link
                to="/employees/inspections"
                className="ml-4 transition-colors hover:text-foreground"
              >
                Inspecciones
              </Link>
              <Link
                to="/employees/vehicles"
                className="ml-4 transition-colors hover:text-foreground"
              >
                Vehículos
              </Link>
            </div>
          )}
          {(user?.role === "Supervisor" || user?.role === "Administrador") && (
            <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
              <Link
                to="/supervisor"
                className="transition-colors hover:text-foreground"
              >
                Dashboard
              </Link>
            </div>
          )}
        </div>
      </div>
      <div className="flex items-center gap-4">
        <div>
          {user && (
            <div className="flex items-center gap-2 text-sm font-medium">
              <span
                className="flex size-8 shrink-0 items-center justify-center rounded-full bg-secondary text-sm font-medium text-secondary-foreground"
                aria-hidden="true"
              >
                {getInitials(user.name + " " + user.lastName)}
              </span>
              <span className="hidden md:block">
                {user.name} {user.lastName}
              </span>
            </div>
          )}
        </div>
        <Button
          size="icon-sm"
          variant="outline"
          onClick={handleLogout}
          aria-label="Cerrar sesión"
          title="Cerrar sesión"
        >
          <LogOut />
        </Button>
      </div>
    </header>
  )
}
