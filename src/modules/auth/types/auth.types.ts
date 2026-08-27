/** Roles que emite el backend en el payload del token. */
export type Role = "Trabajador" | "Supervisor" | "Administrador"

export interface JwtPayload {
  id: number
  name: string
  lastName: string
  email: string
  role: string
  iat: number
  exp: number
}

export type AuthUser = Omit<JwtPayload, "iat" | "exp">
