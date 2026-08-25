import { Button } from "@/components/ui/button"

import { Field, FieldLabel } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { type LoginInput, loginSchema } from "../schemas/auth.schemas"
import { zodResolver } from "@hookform/resolvers/zod"
import { Controller, useForm } from "react-hook-form"
import { useLogin } from "../hooks/useLogin"

export function LoginForm() {
  const { mutate, isPending } = useLogin()

  const form = useForm<LoginInput>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  })

  const onSubmit = (data: LoginInput) => {
    mutate(data, {
      onSuccess: (token) => {
        console.log("Token recibido:", token)
        // Aquí puedes redirigir al usuario a otra página o realizar otras acciones
      },
      onError: (error) => {
        console.error("Error al iniciar sesión:", error)
        // Aquí puedes mostrar un mensaje de error al usuario
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
        {isPending ? "..." : "Iniciar sesión"}
      </Button>
    </form>
  )
}
