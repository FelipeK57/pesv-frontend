import { Button } from "@/components/ui/button"

import { Field, FieldLabel } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { type LoginInput, loginSchema } from "../schemas/auth.schemas"
import { zodResolver } from "@hookform/resolvers/zod"
import { Controller, useForm } from "react-hook-form"
import { useLogin } from "../hooks/useLogin"
import { useAuthStore } from "../store/auth.store"
import { toast } from "@/components/ui/toast"
import { LoaderCircle } from "lucide-react"
import { useLocation, useNavigate } from "react-router"
import { homeRouteForRole } from "../lib/auth.routes"

export function LoginForm() {
  const navigate = useNavigate()
  const location = useLocation()
  const setToken = useAuthStore((state) => state.setToken)
  const { mutate, isPending } = useLogin()

  // Ruta que el usuario intentaba abrir antes de ser redirigido al login.
  const from = (location.state as { from?: string } | null)?.from

  const form = useForm<LoginInput>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  })

  const onSubmit = (data: LoginInput) => {
    mutate(data, {
      onSuccess: (response) => {
        setToken(response.token)
        const role = useAuthStore.getState().user?.role

        navigate(from ?? homeRouteForRole(role), { replace: true })
        toast.add({
          type: "success",
          title: "Inicio de sesión exitoso",
        })
      },
      onError: (error) => {
        toast.add({
          type: "error",
          title: error.message,
        })
      },
    })
  }

  return (
    <form
      id="form-login"
      className="space-y-4"
      onSubmit={form.handleSubmit(onSubmit)}
    >
      <Controller
        name="email"
        control={form.control}
        render={({ field, fieldState }) => (
          <Field>
            <FieldLabel>Correo electrónico</FieldLabel>
            <Input
              type="email"
              placeholder="Ingrese su correo electrónico"
              {...field}
            />
            {fieldState.error && (
              <span className="text-sm text-red-500">
                {fieldState.error.message}
              </span>
            )}
          </Field>
        )}
      />
      <Controller
        name="password"
        control={form.control}
        render={({ field, fieldState }) => (
          <Field>
            <FieldLabel>Contraseña</FieldLabel>
            <Input
              type="password"
              placeholder="Ingrese su contraseña"
              {...field}
            />
            {fieldState.error && (
              <span className="text-sm text-red-500">
                {fieldState.error.message}
              </span>
            )}
          </Field>
        )}
      />
      <Button
        className="w-full"
        type="submit"
        form="form-login"
        disabled={isPending}
      >
        {isPending ? (
          <LoaderCircle className="animate-spin" />
        ) : (
          "Iniciar sesión"
        )}
      </Button>
    </form>
  )
}
