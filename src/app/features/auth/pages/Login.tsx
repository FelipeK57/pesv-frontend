import { Button, Form, Input } from "@heroui/react";

export const Login = () => {
  return (
    <Form className="flex flex-col gap-4 items-center justify-center min-h-svh mx-auto w-full max-w-sm p-4">
      <h1 className="text-2xl font-semibold">Iniciar sesión</h1>
      <Input
        label="Correo electrónico"
        labelPlacement="outside"
        placeholder="Ingresa tu correo electrónico"
        name="email"
        type="email"
        isRequired
      />
      <Input
        label="Contraseña"
        labelPlacement="outside"
        placeholder="Ingresa tu contraseña"
        name="password"
        type="password"
        isRequired
      />
      <Button fullWidth type="submit" color="primary">
        Iniciar sesión
      </Button>
    </Form>
  );
};
