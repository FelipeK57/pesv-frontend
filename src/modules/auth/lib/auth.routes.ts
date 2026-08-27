/** Ruta inicial según el rol que viene en el payload del token. */
export function homeRouteForRole(role?: string) {
  if (role === "Trabajador") return "/employees"
  if (role === "Supervisor" || role === "Administrador") return "/supervisor"
  return "/"
}
