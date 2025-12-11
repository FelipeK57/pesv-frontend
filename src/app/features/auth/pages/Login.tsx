import { Button, Form, Input } from "@heroui/react";
import { Eye, EyeClosed } from "lucide-react";
import { useState } from "react";

export const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  return (
    <Form className="flex flex-col gap-4 items-center justify-center min-h-svh mx-auto w-full max-w-sm p-6">
      <div>
        <h1 className="text-3xl font-semibold">Iniciar sesión</h1>
        <p className="text-sm text-center">PESV Control</p>
      </div>
      <img src="/Logo_Semcon_2021.png" alt="Logo PESV" />
      <Input
        label="Correo electrónico"
        labelPlacement="outside"
        placeholder="Ingresa tu correo electrónico"
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
        size="lg"
        endContent={
          <button
            type="button"
            className="text-sm text-default-600"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? (
              <Eye className="size-6" />
            ) : (
              <EyeClosed className="size-6" />
            )}
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
