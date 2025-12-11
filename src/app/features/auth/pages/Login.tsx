import { Button, Form, Input } from "@heroui/react";
import { Lock, Mail } from "lucide-react";
import { useState } from "react";

export const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  return (
    <Form className="flex flex-col gap-4 items-center justify-center min-h-svh mx-auto w-full max-w-sm p-4">
      <h1 className="text-3xl font-semibold">Iniciar sesión</h1>
      <Input
        label="Correo electrónico"
        labelPlacement="outside"
        placeholder="Ingresa tu correo electrónico"
        startContent={<Mail className="size-4 text-default-500" />}
        size="lg"
        className="text-base"
        name="email"
        type="email"
        isRequired
      />
      <Input
        label="Contraseña"
        labelPlacement="outside"
        placeholder="Ingresa tu contraseña"
        startContent={<Lock className="size-4 text-default-500" />}
        size="lg"
        endContent={
          <button type="button" className="text-sm text-default-600" onClick={() => setShowPassword(!showPassword)}>
            {showPassword ? "Ocultar" : "Mostrar"}
          </button>
        }
        className="text-base"
        name="password"
        type={showPassword ? "text" : "password"}
        isRequired
      />
      <Button fullWidth type="submit" color="primary" size="lg">
        Iniciar sesión
      </Button>
    </Form>
  );
};
