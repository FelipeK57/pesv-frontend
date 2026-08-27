import { Button } from "@/components/ui/button"
import { useAuthUser } from "@/modules/auth/store/auth.store"
import { LogOut } from "lucide-react"
import { Link } from "react-router"

export function AppHeader() {
  const user = useAuthUser()
  return (
    <header className="flex items-center justify-between border-b px-6 py-4">
      <div className="flex items-center gap-8">
        <h1 className="font-semibold">PESV</h1>
        {user?.role === "Trabajador" && (
          <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
            <Link
              to="/employees"
              className="transition-colors hover:text-foreground"
            >
              Inicio
            </Link>
            <Link
              to="/employees/vehicles"
              className="ml-4 transition-colors hover:text-foreground"
            >
              Vehículos
            </Link>
          </div>
        )}
      </div>
      <div>
        <Button size="icon-sm" variant="outline">
          <LogOut />
        </Button>
      </div>
    </header>
  )
}
