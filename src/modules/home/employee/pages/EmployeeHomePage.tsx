import { useAuthUser } from "@/modules/auth/store/auth.store"
import { QuickActions } from "../components/QuickActions"

export function EmployeeHomePage() {
  const user = useAuthUser()
  return (
    <main className="mx-auto flex max-w-2xl flex-col gap-6">
      <h1 className="text-2xl font-semibold">¡Qué bueno tenerte aquí {user?.name}!</h1>
      <QuickActions />
    </main>
  )
}
