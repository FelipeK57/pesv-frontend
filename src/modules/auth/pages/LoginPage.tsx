import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { LoginForm } from "../components/LoginForm"

export function LoginPage() {
  return (
    <main className="flex min-h-svh flex-col items-center justify-center p-6">
      <h1 className="text-lg font-semibold">PESV</h1>
      <h2 className="text-sm text-muted-foreground">
        Plan Estratégico de Seguridad Vial
      </h2>
      <Card className="mt-6 w-full max-w-sm">
        <CardHeader>
          <CardTitle>Iniciar sesión</CardTitle>
          <CardDescription>
            Ingrese sus credenciales para acceder a su cuenta
          </CardDescription>
        </CardHeader>
        <CardContent>
          <LoginForm />
        </CardContent>
      </Card>
    </main>
  )
}
