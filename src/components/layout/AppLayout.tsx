import { Outlet } from "react-router"
import { AppHeader } from "./AppHeader"

export function AppLayout() {
  return (
    <div className="relative flex min-h-screen flex-col">
      <AppHeader />
      <main className="container mx-auto flex-1 px-4 py-6">
        <Outlet />
      </main>
    </div>
  )
}
